"""Idempotent finishing corrections; never reruns the append-only content builder."""
import json
from pathlib import Path


def load(name):
    return json.loads(Path(f'data/{name}.json').read_text(encoding='utf-8'))


def save(name, data):
    Path(f'data/{name}.json').write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')


common = load('CommonEvents')
common[9]['list'][0]['parameters'][0] = (
    "$gameMessage.add('Joke cards: '+[186,187,188].filter(function(id){return $gameParty.hasItem($dataItems[id]);}).length+'/3.');"
    "$gameMessage.add('Recycling: '+($gameSwitches.value(191)?'6/6 exchanged':[180,181,182,183,184,185].filter(function(id){return $gameParty.hasItem($dataItems[id]);}).length+'/6 collected')+'.');"
    "$gameMessage.add('Machine letter: '+($gameSwitches.value(193)?'delivered':($gameParty.hasItem($dataItems[191])?'carried':'not collected'))+'.');"
    "this.setWaitMode('message');"
)
# Change only visible new prose, preserving interpreter scripts/conditions/parameters.
import re
import textwrap


def reflow(commands):
    result = []
    index = 0
    while index < len(commands):
        cmd = commands[index]
        if cmd['code'] != 101:
            result.append(cmd)
            index += 1
            continue
        header = cmd
        index += 1
        lines = []
        while index < len(commands) and commands[index]['code'] == 401:
            lines.append(commands[index]['parameters'][0])
            index += 1
        text = ' '.join(lines)
        text = re.sub(r'(?<=[A-Za-z:])(?=\d)', ' ', text)
        text = re.sub(r'(?<=\d)(?=[A-Za-z])', ' ', text)
        for name, ident in [('Hard Hat', 50), ('Work Boots', 51), ('Coolt White Helmet', 58), ('Protective Vest', 59)]:
            text = text.replace(f'{name} {ident}', name)
        wrapped = textwrap.wrap(text, 43)
        for start in range(0, len(wrapped), 4):
            result.append(header.copy())
            result.extend(dict(code=401, indent=header['indent'], parameters=[line]) for line in wrapped[start:start+4])
    return result


common[9]['list'] = reflow(common[9]['list'])
save('CommonEvents', common)

# These existing records are costume garments; type0 cannot be equipped natively.
armors = load('Armors')
descriptions = {
    50: 'Work-crew disguise hat. Pair with Work Boots\non one walking party member for local reactions.',
    51: 'Work-crew disguise boots. Pair with Hard Hat\non one walking party member for local reactions.',
    58: 'Inspector disguise helmet. Pair with Protective\nVest on one walking party member.',
    59: 'Inspector costume vest. Pair with Coolt White\nHelmet on one walking party member.',
}
for ident, description in descriptions.items():
    armors[ident]['atypeId'] = 1
    armors[ident]['description'] = description
save('Armors', armors)

# Guard the whole optional interaction before exposure, item cost or completion.
manifest = json.loads(Path('tools/bounded-additions/manifest.json').read_text(encoding='utf-8'))
for entry in manifest['pickups'] + manifest['hazards']:
    name = f"Map{entry['map']:03}"
    data = load(name)
    commands = data['events'][entry['event']]['pages'][0]['list']
    start = next(i for i,c in enumerate(commands) if c['code'] == 411 and c['indent'] == 0)
    end = max(i for i,c in enumerate(commands) if c['code'] == 412 and c['indent'] == 0)
    condition = f"$gameParty.numItems($dataItems[{entry['item']}])<$gameParty.maxItems($dataItems[{entry['item']}])"
    body = commands[start+1:end]
    if not (body[0]['code'] == 111 and body[0]['parameters'] == [12, condition]):
        shifted = [dict(c, indent=c['indent']+1) for c in body]
        commands[start+1:end] = [dict(code=111, indent=1, parameters=[12,condition])] + shifted + [
            dict(code=411, indent=1, parameters=[]),
            dict(code=101, indent=2, parameters=['',0,0,2]),
            dict(code=401, indent=2, parameters=['Your pack is full. Make room, then return.']),
            dict(code=401, indent=2, parameters=['The cache remains untouched.']),
            dict(code=412, indent=1, parameters=[]),
        ]
    save(name, data)
print('Scrapbook counts now use three bounded lines; cookbook and outfit clues reflowed.')
