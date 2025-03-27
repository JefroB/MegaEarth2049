 /*:
 * @plugindesc Allows you to set up common Action Squences to be called on later from within another action sequence.
 * @author SergeofBIBEK
 * @help
 *
 * Action Sequence Proxy
 * Version 1.00
 * by SergeofBIBEK
 *
 *
 * This Plugin requires:
 *
 * Yanfly's Battle Engine Core
 *    (http://yanfly.moe/2015/10/10/yep-3-battle-engine-core/)
 *
 * Action Sequences can get very lengthy and difficult to manage.
 * Now you can enter some action sequences into a skill to call on later.
 * This will make action sequences potentially a lot shorter for each skill.
 * Addtionally you can update the action sequences in one place and it
 * suddenly applies to all skills that use it!
 *
 *
 * ==========================================================================
 *  How to Set Up
 * ==========================================================================
 *
 * Place this plugin below YEP_BattleEngineCore.
 *
 * To Setup, place the following notetags into any skill's notebox:
 *
 *     <Action Sequence Proxy: X>
 *     </Action Sequence Proxy>
 *
 * X is the number/ID of the Proxy. You will use this to call the sequence.
 * Between the notetags enter any action sequence.
 *
 * For Example on Skill 5:
 *
 *     <Action Sequence Proxy: 1>
 *     motion attack: user
 *     motion wait: user
 *     action animation
 *     wait for animation
 *     action effect
 *     death break
 *     wait: 8
 *     </Action Sequence Proxy>
 *
 *
 * ==========================================================================
 *  How to Call Proxy Sequence within Action Sequences
 * ==========================================================================
 *
 * To call a Proxy Sequence, use the following command:
 *
 *   PROXY X FROM Y
 *
 * X is the number/ID of the Proxy that you set up. This is 1 in the example.
 * Y is the ID of the skill that contains the Proxy. This is 5 in the example.
 *
 * Here is an example of the previous example's Proxy Sequence being called:
 *
 *     <Target Action>
 *     hide battle hud
 *     move user: target, front, 30
 *     wait for movement
 *     proxy 1 from 5
 *     show battle hud
 *     </Target Action>
 *
 * When you get to the line "proxy 1 from 5" then the plugin will grab
 * all of the sequences from <Proxy Action Seqence: 1> on skill 5 and
 * place them all in that spot in the action sequence.
 *
 * You can have multiple instances of the notetag in one skill.
 * For example:
 *
 *     <Action Sequence Proxy: 1>
 *     motion attack: user
 *     motion wait: user
 *     action animation
 *     wait for animation
 *     action effect
 *     death break
 *     wait: 8
 *     </Action Sequence Proxy>
 *
 *     <Action Sequence Proxy: 2>
 *     hide battle hud
 *     move user: target, front, 30
 *     wait for movement
 *     </Action Sequence Proxy>
 *
 * Now the action sequence can be even shorter.
 *
 *     <Target Action>
 *     proxy 2 from 5
 *     proxy 1 from 5
 *     show battle hud
 *     </Target Action>
 *
 *
 * Writing action sequences is now more organized and easy!
 * It's up to you to decide how to organize them.
 * All on one skill, or across multiple skills.
 */

var Imported = Imported || {};
Imported["SergeofBIBEK Action Sequence Proxy"] = 1.00;

if(Imported.YEP_BattleEngineCore)
    {

        //Alias of Yanfly's BattleManager.processActionSequence function.
        var SergeofBIBEK_ASProxy_BattleManager_processActionSequence =
            BattleManager.processActionSequence;
        BattleManager.processActionSequence = function(actionName, actionArgs)
        {
          // Action Sequence Proxy
          if (actionName.match(/PROXY[ ](\d*)[ ]FROM[ ](\d*)/i))
          {
              //Calls my Original Function passing in the variables.
              return this.SergeofBIBEKAddProxyCommands(RegExp.$1, RegExp.$2);
          }

            //Call the original
          return SergeofBIBEK_ASProxy_BattleManager_processActionSequence.call(this,
            actionName, actionArgs);
        };

        /**
        * Original function that grabs the AS commands and queues them up.
        * @function BattleManager.SergeofBIBEKAddProxyCommands
        * @param {String} SergeProxyID - a number that represents ID of the proxy notetag
        * @param {String} SergeSkillID - a number that represents the ID of the skill where the proxy is stored
        * @return {bool} true or false that Yanfly's processActionSequence is waiting for.
        * @this BattleManager
        * @author SergeofBIBEK <SergeofBIBEK@gmail.com>
        * @todo Handle error cases.
        * @todo Optimize
        */
        BattleManager.SergeofBIBEKAddProxyCommands = function(SergeProxyID, SergeSkillID)
        {
            //Regex matching the starting notetag plus the number the user provided.
            var SergeRegExStart = new RegExp("<\\s*Action\\s*Sequence\\s*Proxy\\s*:\\s*" + SergeProxyID + "\\s*>", "i");
            //Regex matching the end notetag
            var SergeRegExEnd = new RegExp("<\\s*\/\\s*Action\\s*Sequence\\s*Proxy\\s*>", "i");
            //Each line of the Skill's notetag separated into an array.
            var SergeNotetagData = $dataSkills[parseInt(SergeSkillID)].note.split(/[\r\n]+/);

            //Boolean to set once the starting notetag has been found.
            var SergeStart = false;
            //Temp array to store action sequences in.
            var SergeActionSequenceArray = [];

            //For each line in the skill's notetag
            for (var i = 0; i < SergeNotetagData.length; i++)
                {
                    //check if we are inside the correct notetag, if not then do nothing.
                    if (SergeStart)
                        {
                            //check if this is the end notetag, if so then break. If not, then store that line.
                            if (SergeNotetagData[i].match(SergeRegExEnd))
                                {
                                    break;
                                }
                            else
                                {
                                    //store line in the temp array after converting it to Yanfly's format.
                                    SergeActionSequenceArray.push(this.SergeofBIBEKConvertSequenceLine(SergeNotetagData[i]));
                                }
                        }
                    else if (SergeNotetagData[i].match(SergeRegExStart))
                        {
                            SergeStart = true;
                        }
                }
            //Take everything out of the array and add (unshift) it into the current action list queue.
            //  Note that you have to put these in backwards (pop) so that they will come out in the right order.
            while (SergeActionSequenceArray.length > 0)
                {
                    this._actionList.unshift(SergeActionSequenceArray.pop());
                }
            return true;
        };


        //Very slightly modified from Yanfly's BattleManager.ConvertSequenceLine function.
        //  Now it just returns the result instead of using it. (This functionality should be separated in the first place.)
        BattleManager.SergeofBIBEKConvertSequenceLine = function(line)
        {
            var SergeofBIBEKSeqType6 =
              /[ ]*(.*):[ ](.*),[ ](.*),[ ](.*),[ ](.*),[ ](.*),[ ](.*)/i;
            var SergeofBIBEKSeqType5 =
              /[ ]*(.*):[ ](.*),[ ](.*),[ ](.*),[ ](.*),[ ](.*)/i;
            var SergeofBIBEKSeqType4 =
              /[ ]*(.*):[ ](.*),[ ](.*),[ ](.*),[ ](.*)/i;
            var SergeofBIBEKSeqType3 =
              /[ ]*(.*):[ ](.*),[ ](.*),[ ](.*)/i;
            var SergeofBIBEKSeqType2 =
              /[ ]*(.*):[ ](.*),[ ](.*)/i;
            var SergeofBIBEKSeqType1 =
              /[ ]*(.*):[ ](.*)/i;
            var SergeofBIBEKSeqType0 =
              /[ ]*(.*)/i;
            var SergeofBIBEKSeqType;
            var seqArgs;

          if (line.match(SergeofBIBEKSeqType6)) {
            SergeofBIBEKSeqType = RegExp.$1;
            seqArgs =
              [RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6, RegExp.$7];
          } else if (line.match(SergeofBIBEKSeqType5)) {
            SergeofBIBEKSeqType = RegExp.$1;
            seqArgs = [RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6];
          } else if (line.match(SergeofBIBEKSeqType4)) {
            SergeofBIBEKSeqType = RegExp.$1;
            seqArgs = [RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5];
          } else if (line.match(SergeofBIBEKSeqType3)) {
            SergeofBIBEKSeqType = RegExp.$1;
            seqArgs = [RegExp.$2, RegExp.$3, RegExp.$4];
          } else if (line.match(SergeofBIBEKSeqType2)) {
            SergeofBIBEKSeqType = RegExp.$1;
            seqArgs = [RegExp.$2, RegExp.$3];
          } else if (line.match(SergeofBIBEKSeqType1)) {
            SergeofBIBEKSeqType = RegExp.$1;
            seqArgs = [RegExp.$2];
          } else if (line.match(SergeofBIBEKSeqType0)) {
            SergeofBIBEKSeqType = RegExp.$1;
            seqArgs = [];
          } else {
            return;
          }
          var array = [SergeofBIBEKSeqType, seqArgs];

            return array;
        };
        
    }
else if(Utils.isOptionValid('test') && Utils.isNwjs())
    {
        var message = "Yanfly's YEP_BattleEngineCore is not installed or installed incorrectly. Make sure it is above SergeofBIBEK's Action Sequence Proxy.";
        alert(message);
        throw new Error(message);
    }
else
    {
        throw new Error("Action Sequence Proxy Error: Missing Requirement 'YEP_BEC'");
    }
