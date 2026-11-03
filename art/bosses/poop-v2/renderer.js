/* Shared deterministic renderer: immutable master body plus eye-only blink patch. */
var ME_PoopArt={
 definitions:{Poop:{image:'poop-master.png',width:1426,height:1103,origin:[765,949],scale:.23},Turd:{image:'turd-master.png',width:1536,height:1024,origin:[756,810],scale:.09}},
 draw:function(ctx,key,images,blink,hop){const d=this.definitions[key];ctx.save();ctx.translate(0,-(hop||0));ctx.scale(d.scale,d.scale);ctx.translate(-d.origin[0],-d.origin[1]);ctx.drawImage(images[d.image],0,0);if(key==='Poop'&&blink){ctx.save();ctx.beginPath();ctx.ellipse(818,506,96,89,-.21,0,Math.PI*2);ctx.ellipse(975,495,56,65,-.10,0,Math.PI*2);ctx.clip();ctx.drawImage(images['poop-blink.png'],0,0);ctx.restore();}ctx.restore();}
};
