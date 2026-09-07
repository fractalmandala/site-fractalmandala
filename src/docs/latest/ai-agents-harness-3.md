# The Harness Is a Yantra

*Every hard problem in working with an agent turns out to be a problem of restraint. The tradition that named technology as restraint also knew what restraint costs the one who builds it.*

The settled opinion of 2026 is that the model has stopped being the bottleneck. Capability has outrun our ability to aim it. The field has moved through prompt engineering into context engineering and now into what it calls harness engineering, and the framing is everywhere identical: the intelligence sits in the model, the usefulness sits in the wrapper around it. The figures that circulate are grim and probably directionally right - the large majority of agent projects never reach production, and the postmortems almost never blame generation. They blame missing repository context, brittle tool interfaces, weak validators, retry policies that loop, permission boundaries that do not match the task. Hashimoto's rule has hardened into folk wisdom: every line in your AGENTS.md should trace to a real agent failure.

This is all correct and none of it is deep. It describes the labour without naming what the labour is. So let us name it, because the naming has already been done, about two and a half millennia before anyone wrote a system prompt.

## Restraint, Not Extension

The Sanskrit word for instrument is yantra, from the dhātu √yantr, which Pāṇini gives as saṅcokana - restraining, curbing, checking. A yantra is an instrument of restraint. This is a strange thing to call a tool if you have been raised inside the Greek inheritance, where technē is craft and making, and where the tool is understood as an extension: the hammer extends the fist, the lever extends the arm, the telescope extends the eye. Marshall McLuhan built an entire career on that intuition and never once questioned it. The tool as prosthesis. The tool as amplifier of a human capacity that was already there in smaller form.

The Indian intuition runs the other way. A tool is what limits. The loom restrains thread into cloth. The dam restrains water into power. The mantra restrains breath and attention into a single line of force. The yantra in the ritual sense - the geometric diagram - restrains an unbounded divinity into a form that a human being can actually approach without being annihilated by it. In every case the instrument does its work by narrowing, and the power that emerges is the power of the constraint rather than the power of the thing constrained.

Now look at what you actually do when you make an agent useful. You subtract. You narrow the action space, because a tool surface of two hundred functions produces worse outcomes than a tool surface of nine. You bound the context, because the model attends worse when you give it more. You write rules that say what not to touch, which directories are off limits, which patterns to never reproduce. You add validators, which are refusals. You add permission boundaries, which are refusals with a human in them. Every single line of a mature AGENTS.md is a restraint, and Hashimoto's rule says so explicitly: each line exists because something once went wrong, and the line is the scar tissue that stops it going wrong again.

##### We have built the most general instrument in the history of instruments, and discovered that all the engineering is in the curbing of it.

The material supplies this reading; I am only reporting it. The raw model is capacity without limit and therefore without direction, which is to say without usefulness. The harness is the yantra that makes the capacity approachable.

## A Being Without a World

Why should restraint be the operative work? Because a general intelligence with no situation cannot act. It can only produce.

In the Indian frame every actor exists within a loka - a world, from √lok, to see, hence a field of visibility, a bounded arena within which seeing and acting make sense. A jiva without a loka is a contradiction. Action becomes karma only inside a world where consequence can accrue. Outside such a world there is motion without weight, because every possible move is equally permitted and therefore no move is right.

The base model is precisely this: enormous competence with no loka. It has read everything and belongs nowhere. It cannot tell whether the file you handed it is the production configuration or an abandoned draft, whether the convention it sees repeated forty times is the house style or forty instances of the same unfixed mistake, whether shipping on Friday is normal here or a firing offence. Nothing in its training resolves these, because they are facts about your world and about no other.

So when we say harness engineering, what we are doing is building a loka. We are constructing the bounded arena inside which the agent's moves acquire consequence and therefore acquire correctness. The tool definitions are the affordances of that world. The validators are its physics. The permission boundaries are its dharma, in the plain old sense of the word - the constraints proper to a particular being in a particular position, which is what dharma always meant before it got flattened into "religion" by people who had only one category for it.

And the reason this is hard has nothing to do with the model.

## The Excavation

To build a world for the agent, you must state what you know. All of it. In words. This turns out to be close to impossible, and the impossibility is the entire difficulty of the field.

Polanyi's formulation is the one everybody quotes and nobody has really absorbed: we know more than we can tell. The senior engineer who reviews a pull request in ninety seconds and says "no, not like that" is running a discrimination he cannot fully articulate, assembled out of a decade of watching things break. The editor who reads a paragraph and knows it is dead is doing the same. Most of the competence in any skilled human sits below the waterline of language, which is exactly why apprenticeship exists as an institution and why nobody has ever learned a craft from a manual.

Working with agents is the first labour in human history that forces this material up into the explicit, at scale, as a daily requirement. You cannot hand an agent a tacit standard. You can only hand it words, and the words you produce will be a thin and embarrassing shadow of the thing you actually know. Then the agent will act on the shadow, and the output will be wrong in a way that shows you precisely which part of your knowledge you failed to say.

##### The agent's failures are a readout of your unstated assumptions, printed in a form you cannot argue with.

This is the real reason the work is exhausting, and it explains why people who are excellent at their craft are so often bad at directing agents at first. Their competence is deep and almost entirely submerged. The person who has to articulate a standard for the first time at the age of forty-five is doing something new, and doing it under production deadline. What the industry calls context engineering is self-excavation with a business justification attached.

Which is worth doing. The excavation makes you clearer. Every serious practitioner I know reports the same thing: writing the rules for the agent forced them to discover what their rules actually were, and several of them turned out to be nonsense they had inherited without inspection.

And here is where it turns.

## What the Rishis Refused

The Vedic tradition refused to write down the Veda. This refusal has been misread for two centuries as primitivism, as the absence of a technology rather than the rejection of one, and the misreading survives in textbooks that speak of an "oral phase" as though it were a waiting room before literacy arrived. The same civilization produced Pāṇini, the most formally precise artifact anyone had made anywhere in the world before the twentieth century, a grammar of such compression that computer scientists still study its metarules. That civilization was not lacking the concept of exact notation. It declined to apply it here, deliberately, and built instead the most elaborate memory-preservation technology ever devised - pada, krama, jata, ghana, recursive recitational forms that encode the text redundantly enough to survive transmission errors, a checksum built out of chant.

Why go to that trouble to avoid a technology you have already mastered?

Because knowledge that lives in the artifact has stopped being known. That is the claim, and it is a claim about the ontology of knowledge rather than a preference about pedagogy. Shruti is what is heard, which means what is held in a living being who is currently holding it. The moment it becomes smriti, remembered and written, it acquires durability and loses something else. It can now persist without anyone understanding it. A written rule survives the death of the reason for the rule. A guru cannot transmit what he has stopped comprehending; a manuscript transmits perfectly and comprehends nothing.

Look now at your CLAUDE.md.

Every judgment you successfully externalize into that file is a judgment you have stopped exercising. That is the point of externalizing it. The gain is real - the standard now applies at three in the morning without you, applies to work you never see, applies consistently in a way your own tired attention never could. This is what makes the artifact valuable and it is exactly what makes it dangerous. The rule becomes durable and your discrimination becomes vestigial, and these are the same event described from two sides.

Six months in, the file is four thousand words. Nobody can say which lines are load-bearing. Half of them address failure modes in a model version that has been retired. Some of them are actively harmful and nobody notices, because the harness is doing its job of restraint and what it restrains is invisible by construction. You have accumulated a smriti with no shruti standing behind it. A body of rules whose living source has died.

## The Same Shape, Larger

What is true of the engineer is true of the institution, because these things are fractal and always have been. The individual externalizes tacit judgment into a config file; the organization externalizes it into process, and has been doing so for a century. That is what bureaucracy is - the conversion of judgment into procedure so that the procedure can run without the judgment. The result is legible to anyone who has ever dealt with a large institution: a body that cannot say why its rules exist, cannot change them, and defends them with the special vehemence reserved for things one does not understand.

Agents compress that century into about eighteen months. The externalization is faster, the artifacts are larger, and the feedback that used to correct bad process - a human being noticing the rule is stupid and quietly not following it - is precisely what we have engineered out. An agent does not quietly not follow the rule. It follows the rule beautifully, at scale, into the ground.

## What You Should Keep Doing by Hand

The counsel that follows is short, and it concerns what you should refuse to hand over.

Viveka - discrimination, the faculty of telling this from that, which the tradition treats as the beginning of all serious practice - is the one thing that must stay in the human and must stay exercised. Whether a machine could hold it is a separate essay. The point here is narrower: a faculty that goes unexercised is a faculty that has gone, and you will not discover its absence until the day you need it.

So the working rule is this: encode into the harness the judgments you have stopped caring about, and never the judgment you most care about. If architecture is what you want to remain excellent at, do not write the architecture rules and delegate; do the architecture and delegate the plumbing. If prose is the thing, let the agent gather the sources and hold the sentences yourself. The harness should be buying back attention for the work you are protecting, and the test of a harness is whether it frees your judgment or replaces it. These feel identical from inside. They diverge completely over two years.

Second, treat the harness as shruti rather than smriti, which means re-derive it. The tradition has a name for the practice of periodic re-recitation - svadhyaya, self-study, the obligation to go through what you hold and hold it again. A rule you cannot currently re-derive from the failure that produced it is a rule you no longer own. Delete it or earn it back. This is unglamorous work and nobody will schedule it for you, and the alternative is that your harness becomes a haunted house.

Third, and this is where the current discourse is right, the unit of work has moved to verification. Generation scales with compute and checking scales with scarce human attention, so an agent running for sixteen hours produces sixteen hours of output that somebody must either trust or inspect. This is the constraint that will cap adoption long before capability does. The practical consequence is that the eval is the artifact and the prompt is disposable. Anyone can write instructions. The person who can state, precisely, what would count as this being done correctly is doing the actual engineering, and that statement is the most compressed form of the tacit knowledge we have been talking about all along.

## The Mirror

There is one gift in all of this that no other collaborator has ever given us. Human incompetence is illegible. Hand a vague instruction to a capable colleague and he will silently repair it out of his own understanding, produce something reasonable, and you will never learn that your instruction was vague. His competence conceals your failure. It is a kindness and it is why most people go through an entire career without discovering how badly they specify things.

The agent extends no such courtesy. It does what you said. When what you said was incoherent, the output is incoherent in a specific way, and the specific way is a portrait of the gap in your own thinking, rendered at high resolution and time-stamped.

The man complaining that the model is stupid is very often reading a transcript of his own vagueness and failing to recognize the handwriting. And the failure at the other end is worse and quieter: the engineer with forty thousand words of accumulated harness that no living person authored, half of it patching a model that no longer exists, supervising an agent he has stopped reading, in a repository he has stopped understanding, shipping steadily, with every rule in place and nobody left who knows why.

The instrument restrains. That was always the deal. The question the tradition asks, and the one the industry has not started asking, is who is being restrained.

*6 September 2026*
