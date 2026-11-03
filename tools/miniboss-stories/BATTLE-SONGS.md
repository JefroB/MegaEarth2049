# Native battle songs

Three singers: Deductible Duke (insurance jingle), Admiral Clap (sea shanty), Ticket Widow (hold music). Text dialogue, not recorded vocals. No custom plugin or rhythm input.

Existing precedent: Troop 36, Poopoo Caca, uses native Show Text commands. The story bible describes singing enemies and a rhyming dictionary; no working dictionary integration or completed singing encounter was found in live events.

Rhyme references: [condition/commission](https://www.rhymeplug.com/rhymes/commission), [clap family](https://www.rhymezone.com/r/rhyme.cgi?Word=clap&typeofrhyme=perfect), [hold/cold/gold/sold](https://www.rhymezone.com/r/rhyme.cgi?Word=hold&typeofrhyme=perfect). Lyrics are original.

Merge pages from troop-song-pages.json into the corresponding real troops when built; preserve existing combat pages. Turn 0 introduction uses Battle span. Turns 2 + 4X and 4 + 4X alternate verses using Turn span, preventing repeats from multiple actions. Messages advance through native player input. Put victoryBranchCommands inside the map victory branch before rewards, never the loss branch: death of the final enemy may end battle before an HP-zero troop page runs.

The three singing troops are now installed by tools/custodians/install.py (Duke 55, Clap 57, Widow 59). Opening and recurring verses run in battle. Victory couplets still await map encounter victory branches. No songs were added to dossiers or unrelated existing troops.

## The Deductible Duke

An insurance jingle, sung with unbearable cheer

**Opening**

> Having a body? Pre-existing condition!  
> Your pain is excluded; I keep the commission!  

**Turn 2 + 4X**

> Herpes? Excluded. The fine print is tight.  
> Pay for the letter that says you have no right.  

**Turn 4 + 4X**

> Your claim has been shredded; your glands are inflamed.  
> Our profits are healthy. You should be ashamed.  

**Victory branch**

> My policy promised a lifetime of wealth;  
> It seems I excluded my own bloody health!  

## Admiral Clap

A swaggering corporate sea shanty

**Opening**

> Oh, I am the Admiral! Give me a clap!  
> Your clinic and floodgate are caught in my trap!  

**Turn 2 + 4X**

> Your premium rose while your trousers came down;  
> Now pay for your pills, or I bill half the town!  

**Turn 4 + 4X**

> A dose of the clap and a fee at the quay;  
> Your intimate business is income to me!  

**Victory branch**

> My glands have gone bust and my shares took a dive;  
> Tell Legal to bill you for staying alive!  

## The Ticket Widow

Sweet, maddening telephone hold music

**Opening**

> Your call is important. Please stay on hold.  
> Our hearts are of brass and your beds are of cold.  

**Turn 2 + 4X**

> The furnace burns bright for the men with the gold;  
> Your ticket stays open. Your blanket was sold.  

**Turn 4 + 4X**

> We value your patience. We treasure your time.  
> Each minute of waiting earns us one more dime.  

**Victory branch**

> Your case is now closed; there is nothing to pay.  
> Please rate our collapse at the end of your stay.  

## Installed encounter integration

The six custodians now occupy Maps224–235, accessed from their existing recovery rooms. Victory songs are attached to map victory branches. Junction236 and vestibule237 use the six mandate flags168–173. See tools/custodian-placement/README.md; earlier narrative-only scope describes the original authoring pass.
