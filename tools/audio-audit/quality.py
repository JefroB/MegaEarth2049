from pathlib import Path
import json
import numpy as np
import soundfile as sf
rows=[]
for p in Path('audio/se').glob('*.ogg'):
 x,rate=sf.read(p,dtype='float32',always_2d=True);amp=np.max(np.abs(x),axis=1);nz=np.flatnonzero(amp>.001)
 rows.append(dict(name=p.stem,duration=round(len(x)/rate,3),rate=rate,channels=x.shape[1],peak=round(float(amp.max(initial=0)),4),rms=round(float(np.sqrt(np.mean(x*x))),4),leading=round(float(nz[0])/rate,3)if len(nz)else None,trailing=round(float(len(x)-1-nz[-1])/rate,3)if len(nz)else None))
Path('tools/audio-audit/ogg-quality.json').write_text(json.dumps(rows,indent=2),encoding='utf8');print('Measured',len(rows),'Ogg effects; empty signals',sum(r['peak']==0 for r in rows))
