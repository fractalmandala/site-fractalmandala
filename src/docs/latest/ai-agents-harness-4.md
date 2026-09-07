# Karana

*The software we call an agent occupies the grammatical role of an instrument. Almost everything that goes wrong between a man and his machine begins with getting that wrong.*

Panini's karaka system sorts the participants in an action by the role each plays in bringing it about. There is the karta, defined in a sutra of three words - svatantrah karta - the one in whom the independence sits, from whom the action proceeds. There is the karana, sadhakatamam karanam, that by which the action is most effectively accomplished, the instrument. There is the karma, kartur ipsitatamam, the thing most desired by the doer, on which the action lands.

The system is not a taxonomy of objects. A thing shifts roles depending on which action you are describing. The axe is karana when the woodsman fells the tree. In a sentence about the axe splitting the log, the axe becomes karta. Nothing about the axe changed. What changed is where the independence was placed by the one doing the describing.

We have now taken a piece of software whose entire operation consists of executing an intention it did not form, and we have called it the agent. The English word carries the Latin *agere*, to drive, to do, and beneath that a whole legal apparatus - the agent acts for the principal, binds the principal, and is answerable within the scope of authority granted. Every one of those implications is false about the thing sitting in your terminal. And the falseness does work. It has produced a generation of operators who claim the fruit of actions they no longer perform, and who cannot understand why the results keep coming out wrong.

## The Delegation Error

The dominant metaphor for working with these systems is management. You delegate. The agent is a junior engineer, an intern, a contractor. This framing arrived from industrial labor management and it fails at the first joint, because delegation between humans works almost entirely on what is never said.

When a manager tells someone to handle the Peterson account, the instruction carries perhaps two percent of what makes the task executable. The rest was already there: the employee knows what the firm is for, who Peterson is, which mistakes end careers, what "handle" has meant the last eleven times it was used in that building, and - most importantly - that his own name and rent and standing ride on the outcome. He has a body in the room. He has a memory that persists past Friday. He shares a world.

Your agent shares nothing. It has no body in the room, no rent, no Tuesday. It has whatever you put in front of it and nothing else. Between one invocation and the next it does not remember that you exist. No model generation engineers this away. It is the structure of the relationship, and it means that what looks like delegation is something else entirely.

##### Delegation transmits a task into a shared world. With an agent there is no shared world, so every instruction is also an act of world-construction. You are building the loka inside which a particular action becomes the obvious one.

The industry has been circling this for three years without quite naming it. Prompt engineering gave way to context engineering when people noticed that the wording of the request mattered less than what the model could see when it read the request. Context engineering is now giving way to harness engineering - the outer loop, the fresh context per iteration, the verification gates the model cannot reason its way around, the deterministic software that surrounds the probabilistic core. Each step has moved further from the utterance and closer to the environment. The trajectory is correct and the destination has a better name than harness. What is being built is a field of action. A karmabhumi, with all the weight that word carries: a bounded region in which certain acts are possible, certain acts are not, and consequence accrues.

## The World You Have to Build

Once you see the work as world-construction rather than instruction, the practical questions reorder themselves.

The first question stops being "how do I phrase this" and becomes "what does this thing need to be able to see." Not everything - seeing everything is the same as seeing nothing, and a context window stuffed with the entire repository produces an agent that has read it all and understood none of it. The skill is curatorial. Which three files, which prior decision, which failure mode from last week. A working operator spends more time deciding what to withhold than what to supply, and this is the reverse of what most people do in their first month.

The second question is what the thing is permitted to touch. Here the received wisdom is exactly backwards. The instinct is to give the agent more tools, on the theory that capability scales with reach. It does not. Every additional tool with overlapping semantics degrades the selection problem, and an action space with forty entries where twelve would do produces an agent that spends its reasoning budget on choosing rather than doing. The tools you remove are load-bearing.

Which brings us to the word the tradition already has for this.

## Yantra

From the dhatu yantr, which Panini glosses as sancokana - restraining, curbing, checking. A yantra is most literally an instrument of restraint. This is a strange etymology for the Sanskrit word that came to mean machine, and it is strange in a way that is worth sitting with, because the European lineage runs the other direction. *Machina* descends from a root meaning contrivance and power; the machine is that which multiplies force. The yantra is that which binds a field.

Both descriptions are true of any actual device, and each civilization chose which face to name. The lathe multiplies your force and constrains the possible motions of the cutting edge, and it is useful precisely because of the second thing. A geometrical yantra used in upasana does not add anything to the practitioner. It removes options from his attention until a particular state becomes the path of least resistance.

##### A harness is a yantra. It works by subtraction. You narrow the field until right action is the cheapest available action, and then let the thing run downhill.

Everything that actually works in harness design follows from this and from nothing else. Narrow tool schemas beat permissive ones because a schema is a constraint on what can be attempted. Deterministic verification gates beat instructions to be careful, because an instruction is a suggestion and a gate is a wall. Explicit stop conditions beat trusting the model to know when it is done. Fresh contexts per iteration beat one long accumulating conversation, because accumulated context is accumulated permission - every stale assumption in that history remains live and reachable. Structured tool output with a status, a one-line summary, and a named next action beats returning a wall of text, because the shape of the observation constrains the shape of the inference that follows it.

All of it arranges the walls so that the water goes where you want it to go. Nothing in it makes the model smarter, and nothing needs to. The Indian instinct about technology - that the instrument is fundamentally a restraint - turns out to be the operating principle of the most advanced software design problem we currently have.

## Adhikara

Now the harder half, which almost no one wants to hear.

The Vedantic prakriya texts do not begin with the teaching. They begin with adhikari-nirupana, the determination of who is fit to receive it. The Vedantasara opens by specifying the qualified student before it will say a word about the subject. The practice rests on an observation about transmission rather than on any wish to exclude: an instruction delivered to someone lacking the capacity to hold it does not fail neutrally. It does damage. The half-understood teaching becomes a confident error, and confident errors are more durable than ignorance.

Software culture has no concept remotely like this. We ship the same API to everyone and call it democratization, and for most tools that was harmless enough. A spreadsheet in unqualified hands produces a bad spreadsheet. An agent in unqualified hands produces bad work at machine speed, with a plausible surface, in volume, addressed to real recipients.

##### The binding constraint on what your agent can do for you is your own adhikara. The system is a mirror with a gain knob. Give a vague man a powerful agent and you get vagueness at scale, delivered faster, with better formatting.

This is what the current wave of research keeps rediscovering under the name of the human bottleneck. As agents get more autonomous, the constraint does not disappear from the pipeline; it relocates to the human, and it relocates specifically to review, judgment, and sign-off - the parts that will not delegate because someone has to put his name on them. Cognitive load in verifying long reasoning traces becomes the limiting factor. The papers frame this as a scaling problem to be solved with better oversight tooling. Some of it is. But a good deal of it is the ancient problem of adhikara arriving in new clothes, and no amount of tooling dissolves it, because the thing in short supply is the operator's capacity to know what good looks like in his own domain.

The practical consequence is unpopular and simple. The way to get more out of your agent is to get better at the thing you are asking it to do. Better at the work. Prompting was never where the leverage sat. An engineer who cannot read a diff carefully will not be saved by a model that writes excellent diffs. A writer who cannot hear a false sentence will publish false sentences with impeccable grammar. Your agent will take you to the ceiling of your own discrimination and then stop, and it will do so while producing output fluent enough that you cannot tell you have hit the ceiling.

## The Antevasin With Amnesia

If the agent cannot share your world, the question becomes how much of that world you can institutionalize.

The Indian model of transmission is the antevasin - the one who dwells near. The student lives at the teacher's side, and what passes between them across years is the capacity to act rightly in situations the teacher never described and could not have anticipated. Information could have been written down. This could not. Correction happens continuously and in particulars: not here, not that way, watch. The tradition understood that competence transmits by proximity and repetition, and it built an institution around that fact.

Every serious mechanism in current agent practice is a crude reach toward the same thing. The persistent memory file is an attempt at proximity. The skill - a bundle of procedure and judgment loaded when a certain kind of task appears - is an attempt to encode "not that way, watch." The correction loop where you reject an output and say why is the only thing in the whole apparatus that functions like actual teaching, and it is the one most operators skip, because rewriting the thing yourself is faster this once.

That "this once" is the entire game. The operator who fixes the output ships today and starts from zero tomorrow. The operator who fixes the harness - who writes down what was wrong, where the misunderstanding entered, what should have been visible and wasn't - is running an antevasin relationship with a student who has amnesia but perfect notes. The notes are the only continuity there is. Treat them as an artifact of the work rather than overhead, and the relationship compounds. Treat them as overhead and you will be having the same conversation with your machine in eighteen months.

## Where the Karma Lands

Which returns us to the grammar, and to the most quoted line in the Gita, which almost everyone misreads.

*Karmany evadhikaras te ma phalesu kadacana.* Your adhikara is in the action alone, never in the fruits. The word is adhikara again, and it means the domain in which your authority and fitness actually lie, which "right" in the entitlement sense badly mistranslates. Krishna is making a claim about jurisdiction. The act is yours. The fruit is not yours, was never yours, is produced by causes wider than you. Own the act completely; hold the fruit loosely.

Look at what the modern operator has done with this. He has inverted it exactly. He claims the fruit with total attachment - the shipped feature, the published essay, the closed ticket, the number that goes on the review - while disowning the act: the model wrote it, the agent ran it, I only supervised. Full attachment to phala, zero ownership of karma. It is the precise photographic negative of the instruction, and it is achievable now for the first time in history, at scale, by anyone with a subscription.

##### Every design decision in a harness is a decision about where consequence lands. The agent has no stake in any of it. It cannot be harmed by being wrong. All of the karma accrues to you, whether or not you were watching when it was generated.

This is why the fashionable posture - let it run, review later, trust the loop - is an attempt to occupy the karta position for purposes of credit while vacating it for purposes of consequence. The world does not permit that arrangement for long. The reckoning arrives as it always does, in particulars: the migration that dropped the column, the citation that did not exist, the email that went to the wrong list with your name at the bottom of it.

The way to work with an agent, then, is not complicated to state, though it is difficult to sustain. Hold the karta position and do not vacate it. Build the field with care, because the field is the only world the instrument has. Restrain rather than empower, because that is what an instrument is for. Sharpen your own discrimination, because the ceiling is yours and not the model's. Write down every correction, because amnesia is the only permanent condition in the relationship. And read the output as though you wrote it, because in every sense that will eventually matter, you did.

The alternative is visible already, and it looks nothing like the dramatic failure the safety literature keeps rehearsing. It is a man at a desk approving his fourth pull request of the morning, one he has not read, generated from a ticket he did not write, against a specification nobody checked, in a codebase that no living person now understands - and the whole apparatus humming along beautifully, at tremendous speed, with the independence quietly relocated somewhere he never agreed to put it.
