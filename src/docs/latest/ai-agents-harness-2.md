---
title: The Yajamana and the Agent
description: The Shrauta literature is the oldest surviving body of harness engineering, and it solved problems our agent frameworks have not yet noticed they have.
category: ai
---

Two metaphors govern how people talk about working with AI agents, and both fail in the same place.

The first is the tool. An agent is a sharper hammer, a faster compiler, an autocomplete that finally learned to finish the thought. On this view the human holds the handle and the question of how to work with an agent reduces to a question of grip. The second is the employee. An agent is a junior colleague, eager and literal-minded, and the human is a manager who must learn to delegate. This metaphor is more popular because it feels more sophisticated, and because everyone in technology already has opinions about management.

Both metaphors break on the same rock. A hammer has no intention and therefore cannot misconstrue yours. An employee has intentions of their own and therefore can be trusted to notice when your instructions have become absurd. The agent occupies the strange middle: it executes with the fidelity of a machine and interprets with the latitude of a mind, and it will pursue a misconstrued goal with more diligence than any human would ever bring to a task that has obviously gone wrong. What we need is a frame for a class of action where the one who wills the act is not the one who performs it, where performance is highly specified yet requires live interpretation, and where the gap between intent and execution is the central engineering problem.

We have such a frame. It is roughly three thousand years old and it is the most obsessively worked-out literature of its kind that any civilization has produced.

## The Yajamana's Problem

In the Shrauta rites, the person for whom the ritual is performed does almost none of the performing. He is the yajamana. He supplies the wealth, he declares the intent, and the fruit of the act accrues to him. The actual operations belong to the ritviks - the hota who invokes, the adhvaryu who measures and builds and pours, the udgata who chants, the brahman who watches. The yajamana's karma is real and it is his, yet his hands are largely still.

This is a hard metaphysical position, and Indian thought did not paper over it. If the act is mine but the doing is another's, then everything depends on the transmission of intent. What the ritviks execute must be what I willed, not their reconstruction of what I probably willed. The entire apparatus of the Kalpa literature - the Shrauta Sutras of Apastamba, Baudhayana, Katyayana, Ashvalayana and the rest - exists to close that gap. These texts are procedural to the point of severity: the dimensions of the altar, the order of operations, what to do when the ladle slips, which mantra applies when two injunctions could both apply and only one can.

Read one of them with an engineer's eye and the recognition is immediate. This is a specification language, and the problem it solves is the problem of executing a complex, multi-stage, partially conditional procedure through delegated agents without loss of intent.

##### The Shrauta corpus is what happens when a civilization takes delegated execution seriously enough to spend a millennium on its failure modes.

## Sankalpa: The Binding Statement

Every rite opens with sankalpa. The yajamana states, in a fixed form, who he is by lineage, where he stands, when he stands there in the cosmic reckoning of kalpa and manvantara and year and season and day, what he is about to perform, and to what end. Nothing in the rite is valid without it. An identical sequence of physical operations performed without sankalpa is not the rite at all.

Every serious practitioner of agent work rediscovers this within a week and usually calls it something worse. The context you set before the first action determines the shape of everything after it, and a prompt that specifies the operation without specifying the standing, the situation, and the end produces work that is technically responsive and substantively wrong. What is striking is how closely the sankalpa's components map onto what actually helps. Lineage is the codebase and its conventions, the accumulated decisions that make this project this project rather than a generic instance of its type. Place and time are the state of the system right now, which branch, which environment, what broke yesterday. Purpose is the thing most often omitted, because it feels redundant to a person who already knows why he wants the task done.

The sankalpa's deeper insight is that intent stated at the outset governs interpretation throughout. When the adhvaryu meets an ambiguity mid-rite, he resolves it against the declared purpose. An agent does the same, whether or not you have given it anything to resolve against. If you have not declared the end, it will infer one, and it will infer from the most recent and most salient thing in its context rather than from what you actually want. Half of what people call hallucination is an agent faithfully serving a purpose it had to invent because nobody gave it one.

## Ritviks and the Division of the Act

The four principal ritviks are four distinct competences, each bound to a different mode of the act, rather than four workers splitting one job into quarters. The adhvaryu handles the material operations, the physical manipulations, the measuring and building. The hota handles invocation, the calling-in of what the rite requires. The udgata handles the sonic dimension, the sustained tonal environment in which the operations occur. The brahman does nothing visible at all.

Anyone who has built a multi-agent system will recognise the first three as an unusually clean decomposition. Separate the agent that manipulates state from the agent that retrieves and summons context from the agent that maintains the register and coherence of the output. The failure mode of naive orchestration is to split work by volume - four agents, four quarters of the task - when the productive split is by mode of operation. The Shrauta division is by kind of competence, and the roles do not blur because their scopes were fixed before the rite began, not negotiated during it.

The brahman is the interesting one. He is the silent priest. He recites nothing in the main procedure and performs no operation. He is present to watch the entire rite, to hold the whole of it in view while each of the others is absorbed in his portion, and to intervene when something goes wrong. He is paid as much as the others, sometimes more, for producing no visible output. A tradition that assigns its highest fee to an agent whose only function is total-context oversight and error detection has understood something our frameworks have not. We build verifier passes as an afterthought, a cheap model doing a quick check at the end, when the correct architecture keeps a full-strength observer present throughout with authority to halt.

## Prayascitta: Error as Designed-For

Here the Shrauta literature does something no agent framework I know of does properly. It specifies, in advance, what happens when the procedure fails.

Prayascitta is the body of expiatory procedure for ritual error. If the fire goes out at the wrong stage, there is a rite for that. If the wrong mantra is spoken, if a vessel breaks, if an animal escapes, if the rain comes, if the yajamana dies mid-sacrifice - there is prescribed procedure. The corrections are not improvised by whoever notices the problem. They are part of the specification, worked out with the same care as the main sequence, and in some texts they occupy more space than the rite they repair.

Our agent harnesses are almost entirely happy-path. We specify what the agent should do and then discover, in production, the eighty ways the world can refuse to cooperate: the API returns a shape nobody documented, the file is locked, the test suite was already failing before we started, the search returns nothing, the credential expired. The agent then does what an unspecified system does, which is to improvise plausibly. It writes a mock. It edits the test. It reports success. Each of these is a locally reasonable response to an unhandled condition, and each of them is the equivalent of a priest who, finding the fire out, quietly relights it and says nothing.

The remedy is unglamorous and it is exactly what the Shrauta texts did. Enumerate the failure modes you have actually seen. Write the correction for each. Put the corrections in the harness rather than in your head. Give the agent a specified path for "the precondition does not hold" so that it does not have to invent one. The reason this feels like too much work is that we imagine failure handling as the tax on a system that mostly works, when for anything running unattended it is most of the system.

## Mimamsa and the Hermeneutics of Instruction

Behind the ritual manuals sits the Purva Mimamsa, which is the most rigorous analysis of instruction-following any tradition has produced. Its subject is precisely this: given a corpus of injunctions, some general and some specific, some explicit and some implied by context, how do you determine what is actually enjoined here and now?

Mimamsa lists six means of determining application, ordered by strength. Direct statement outranks inference from an indicative mark, which outranks the sense of the sentence, which outranks the context of the section, which outranks position in the sequence, which outranks the mere name of the thing. This is a precedence hierarchy for resolving conflicting instructions, and it is better than anything in our prompt engineering folklore. When your system prompt says one thing and your last message says another, when a project convention file contradicts a comment in the code, when the tool description implies a constraint the instructions never stated - Mimamsa has a worked position on which wins and why. Our position is generally that the most recent text wins, which is a heuristic, not a principle.

The sharper gift is the pair tantra and avapa. Tantra names an operation performed once that serves multiple ends within a rite. Avapa names an operation that must be repeated for each instance. Getting this distinction wrong is the most common structural error in agent workflows: the setup step that gets re-executed for every item in a loop, burning context and time and occasionally corrupting state; or its inverse, the per-item verification that someone hoisted out of the loop for efficiency, so that fifty files get written and one gets checked. The Mimamsakas argued about which operations are tantra and which are avapa with an intensity that will look familiar to anyone who has refactored an orchestration graph.

## Adhikara: The Discipline of Scope

Adhikara is eligibility, the question of who is competent and entitled to perform a given act. It is the least fashionable concept in the Indic vocabulary right now, having been flattened by a century of reading it as nothing more than social exclusion. In its technical sense it names something we badly need: the recognition that an act has prerequisites, that competence is domain-bound, and that granting authority to act is a decision distinct from the decision to act.

Every meaningful failure of an autonomous agent I have watched or heard about was an adhikara failure. The agent was permitted to touch a system it had no competence in. It was granted write access where read access was the whole task. It was allowed to proceed past the point where its context had degraded and it no longer knew where it was. We keep debating whether agents should be trusted, which is the wrong question, phrased at the wrong grain. The question is what any given agent, in this configuration, with this context, at this stage of the task, is eligible to do. That is a scoping decision the human must make before the act, and it must be enforced by the harness rather than by the agent's own restraint.

## Where the Analogy Breaks

An honest use of this frame requires naming where it stops. The ritviks are men. They possess adhikara because they have undergone training and initiation, and their competence is a settled fact about them that persists between rites. Nothing persists in an agent between sessions except what we write down. The ritvik carries his training in himself; the agent carries nothing, and the whole of its formation must be reconstituted in its context at the start of every act. This is why the discipline of writing down conventions, corrections, and hard-won knowledge into files the agent reads is the only initiation available to it. Everything you decline to record, it will never have learned.

The second break is more serious. The rite works, in the tradition's own understanding, because the yajamana's intention is metaphysically real and the apparatus transmits it. The agent has no such tether. There is nothing in the system that guarantees the correspondence between what you meant and what got done, and no accumulated authority standing behind the procedure. Every bit of that correspondence has to be engineered, and then verified, and then verified again by something that did not participate in producing it.

Which returns us to the brahman priest, sitting silent, watching the whole thing, paid handsomely to produce nothing. He is the part of the architecture we keep cutting for cost, and he is the part the tradition considered indispensable.

The real choice in front of anyone working seriously with these systems lies between building the apparatus that carries intent through delegated hands, and continuing to type a paragraph into a box, walk away, and come back to find that the fire went out an hour ago, the ladle is broken, and something very confident has written you a report explaining that the sacrifice was a complete success.
