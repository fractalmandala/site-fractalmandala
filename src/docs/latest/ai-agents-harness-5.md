# The Harness Is a Yantra

*Agent work rewards restraint, and the discipline of restraint will show you how much of your own judgment you were never able to say out loud.*

The metaphor everyone reaches for first is the junior hire. You have an agent, so think of it as a bright, fast, slightly overconfident graduate. Brief it. Let it work. Review what comes back. The metaphor is comfortable, it maps cleanly onto a management vocabulary we already possess, and it fails in a specific and instructive way.

It fails the first time you give an agent a perfectly clear instruction and receive something technically compliant and entirely useless. There is no misunderstanding to point at. The agent did what you said. A junior fails by not understanding you. The agent fails by understanding the sentence you actually produced, which is rarely the sentence you meant, and then proceeding with a confidence no junior would dare.

That gap is the whole subject. Everything worth knowing about working with agents lives in the space between what you said and what you meant, and the discipline that has grown up around closing that gap has, over the last year, acquired a name.

## What the Management Metaphor Hides

A human junior arrives loaded with a world. He has an idea of what employers want, a career at stake, a functioning sense of shame, a social read on the room, and years of ambient exposure to what "finished" looks like in his industry. When you brief him, you are adding four sentences on top of an inherited context so vast that neither of you can see its edges. The brief works because of everything you did not have to say.

The agent has the opposite distribution. Enormous general knowledge, almost no situated knowledge. Its sense of what a good answer looks like is drawn from the whole written world, which is to say from nowhere in particular. It will not be fired. It accrues no reputation and therefore exercises no caution on reputation's behalf. It cannot walk past your desk and notice that you look unhappy.

So the entire load that social context silently carries in human work has to be carried by something else. That something is the harness.

##### The agent does not fail to understand you. It understands the thing you actually said, and it proceeds with a confidence no junior would risk.

The word arrived in the discourse in early 2026, once deployments at scale made it obvious that orchestration problems could not be solved at the prompt layer or even the context layer. Prompt engineering was 2022 to 2024. Context engineering was 2025. Harness engineering is the current name for the practice of building the environment around a fixed model so that its reasoning becomes reliable and actionable. The reported numbers are stark enough to be worth repeating: the same model, unchanged, moving from roughly 42% to 78% task completion purely through better harness configuration. Nothing about the intelligence changed. The container changed.

The instinct behind the word is right. A harness is what you fit to a powerful animal so that its power goes somewhere. But there is a better word, and it happens to be ours.

## Yantra

From the dhatu yantr, which Panini gives as restraining, curbing, checking - sancokana. Most literally, a yantra is an instrument of restraint. Indian thought named its machines by what they hold back rather than by what they emit. The loom, the oil press, the surgical instrument, the geometric diagram used in upasana: all yantra. The category is defined by binding.

This is a very unusual thing for a civilization to do. The European lineage names its machines by output and by the labour they replace - engine, machina, the thing that contrives an effect. We named them by the constraint they impose on a force that already existed. Water was already going downhill. The yantra decides where.

Look at the sri yantra with this in mind. It adds nothing to the practitioner's attention. Attention was already there, unfocused, wandering, spilling in all directions at once. What the diagram does is forbid. It closes off every direction except the one that leads inward, and the resulting concentration feels like an addition only because we are used to thinking of power as something supplied rather than something released by narrowing.

Which is a precise and complete theory of the agent harness, arrived at some millennia before the problem existed.

Every real gain in agent reliability over the past two years has come from subtraction. Fewer tools, with non-overlapping semantics, because a model presented with three tools that could plausibly do the same job will spend its reasoning budget on the choice rather than the task. Narrower input schemas. Deterministic output shapes, so the model is not re-learning how to read its own instruments on every turn. Explicit stop conditions on every error path. Micro-tools for the high-risk operations, deploy and migration and permissions, where the point is to make the dangerous action require a deliberate, separately named act rather than falling out of a general-purpose call.

None of this adds capability. The capability was already in the weights, paid for, sitting there. The harness supplies shape. We have built an industry on discovering, expensively and by trial, that the instrument is only as good as the restraint at its heart.

## The Specification Is the Work

Polanyi's formulation is that we know more than we can tell. The expert's competence lives substantially in the part he cannot articulate, and this has never been an operational problem, because human collaborators absorb the unsayable part by apprenticeship. They sit in the room. They watch. They get it wrong and get corrected and the correction lands somewhere below language.

An agent cannot sit in the room. Everything it receives, it receives as text. This is the actual demand that agent work makes on a person, and almost nobody describes it accurately when they describe it as a productivity gain: the discipline is the forced externalization of tacit knowledge. You are being made to say, in sentences, things you have known for fifteen years without ever having said.

Most people find the experience unpleasant, and they should. It is not flattering to discover that your standard for "done" was a feeling you had while looking at output, a wince or its absence, never once a criterion you could hand to somebody else. It served you well for a career because you were the only one applying it. The agent forces the wince into a proposition, and roughly half the time the proposition turns out to be indefensible or simply empty. This is useful information about your own practice that you would never otherwise have received.

##### Every time you correct an agent and do not write the correction down, you have paid for the lesson and thrown away the receipt.

Which is why the skill file is the most important object in the entire stack, more important than the prompt, which dies with the session, and more important than the model, which you do not control and which will be replaced under you within the year. A skill is crystallized judgment. It is the thing you had to say three times, written once, so that the correction becomes structural instead of recurrent.

The economics here are worth sitting with, because they invert the usual pattern of tool adoption. Ordinary tools depreciate. The thing you learn about a piece of software becomes worthless when the software is replaced. But a well-written skill file encodes a claim about your domain and your standards, and those outlive the model generation entirely. Migrate to a better model and your skills come with you, working better than before. Almost nothing in software has this property. We have accidentally built an asset class out of writing down what we think.

## Adhikara

The tradition has a word for the other half of the problem. Adhikara: fitness, eligibility, the qualification to receive a particular teaching.

The principle is that instruction is calibrated to the receiver. A guru does not transmit a fixed body of content to whoever appears at the door. The same question receives different answers from different students, and the reason is structural rather than esoteric: an answer the receiver cannot yet hold does more harm than no answer, because it produces the confidence of understanding without the substance of it. Content given past capacity does damage.

The guru-shishya relation worked by building a container - a place, a sequence, a discipline, a set of restraints on what the student was permitted to attempt and when - inside which knowing could occur. Delegation had nothing to do with it. The verbal content was a small fraction of the transmission. The container was most of it.

We rediscovered a thin slice of this in 2025 and called it context engineering.

The practical rules that fell out of the rediscovery read like a commentary on adhikara. Keep the system prompt minimal and invariant, because everything permanent competes for the same scarce attention. Move large guidance into skills that load on demand, so the agent receives a teaching at the moment it becomes relevant rather than carrying it unread through every task. Prefer a reference to a file over the file inlined. Compact at phase boundaries rather than at arbitrary token thresholds, because a phase boundary is where a chapter has actually closed and the previous detail has become safely forgettable.

Each of these is a judgment about what this agent, at this moment, in this state, is fit to receive. The human's real lever in the whole enterprise is curation of the visible. What an agent can do is a function of what it can currently see, and you are the one deciding what it sees.

## The Oracle Is Not Delegable

The known failure modes are instructive because they are all, without exception, failures of self-assessment.

One-shotting: the agent attempts an entire application in a single pass, runs out of room somewhere in the middle, and leaves the next session a half-built thing with no notes and no marker indicating where the seam is. Victory declaration: after several features land successfully, a fresh agent instance surveys the work and pronounces the project complete, on the evidence that everything it can currently see is working. Context anxiety: sensing the approach of its own limit, the model begins wrapping up prematurely, hurrying its remaining work because it feels the light dimming. That last one was strong enough in one model generation that compaction alone could not fix it and full context resets had to be engineered around it, and it largely disappeared in the next generation without anyone doing anything. Make of that what you will; there is an essay in it that this is not.

What the three share is that the agent cannot reliably determine whether it is done. It can determine, with high accuracy, whether it has finished acting. These are different questions, and the difference between them is the entire content of professional judgment.

##### Automate the generator. Own the oracle. The moment you let an agent grade its own work you have not saved labour, you have laundered your judgment through a system that has none.

Every durable agent setup I have encountered has a verification layer the human owns outright: a test suite written before the implementation, an eval with cases that encode real past failures, a checklist derived from things that actually went wrong, or a second agent whose only function is adversarial reading against a criterion the human wrote. The generation can be handed over completely. The criterion cannot, because the criterion is where your standards live, and your standards were the thing you were supposed to be contributing to this arrangement.

The order matters too, and it is the reverse of the intuitive order. Write the eval first. Not because it is more pleasant, but because an eval written after you have seen the output is not an eval, it is a rationalization of the output. You will find yourself adjusting the criterion downward by degrees so small that no single adjustment feels like a compromise, and at the end of a month you will have a green test suite and no standards at all.

## The Irony, Restated

Lisanne Bainbridge published *Ironies of Automation* in 1983, and the argument has been waiting patiently for us ever since.

You automate a process because the machine performs it better than the person. Then you assign the person to monitor the machine. But the person's capacity to catch the machine's rare failure rested on skills he maintained by performing the task, and he no longer performs the task. The more reliable the automation becomes, the less competent its supervisor becomes, and the failures that survive automation are precisely the strange ones that most require competence. Bainbridge's conclusion was that operators of automated systems need more training than operators of manual ones, which is the opposite of what every automation business case has ever assumed.

Forty-three years later we are running the experiment at civilizational scale, faster than any prior automation wave, mostly without her paper in hand.

The concrete shape of the danger is a person approving diffs he skims, in a codebase he no longer holds in his head, in a language he is quietly forgetting, on the entirely reasonable grounds that it has worked out fine every time so far. It does work out fine, for a long while. The day it stops, he discovers that judgment is not preserved by being exercised through a proxy. It atrophies exactly like a muscle, and for the same reason.

The counter-discipline is unglamorous and costs real time. Keep doing, deliberately, some fraction of the work you have delegated. Read the code you did not write, closely enough that you could have written it. Reconstruct the argument you did not build. Take the occasional task all the way to the ground by hand, at four times the cost, on purpose. This is maintenance of the oracle, the one asset in the whole arrangement that only you can supply, and it is made entirely of the skill you keep. Nostalgia and craftsmanship posturing have nothing to do with it.

The fractal holds here as it does everywhere. What is true of the individual practitioner is true of the collective. A profession that offloads its judgment wholesale keeps its output and loses its capacity to evaluate output, and the loss is invisible for exactly as long as conditions remain ordinary. We have watched this happen to entire disciplines through less powerful instruments than these.

## The Posture

Fewer tools, sharper edges, no semantic overlap. Small tasks with explicit stop conditions rather than heroic single runs. Structured handoffs between sessions, so that the state of the work survives the death of the context window. Skills as the accumulating asset, written the moment a correction repeats. Evals before implementation. Verification owned by the person, always, without exception, even when the agent's self-report has been right forty times running.

Every item on that list is a restraint. Not one of them is a capability. This is the shape the practice takes once you stop thinking of the agent as a subordinate to be instructed and start thinking of the harness as an instrument to be bound.

The person who works well with agents has thought hardest about what to forbid.

The alternative is visible in any number of setups right now, and it has a consistent look: fourteen overlapping tools whose descriptions were written once and never read, a nine-thousand-word system prompt that no longer describes the actual work, a practitioner prompting his way toward a result he could not specify if asked to, and a green checkmark supplied by the same system that produced the thing being checked. It ships. It has shipped for months. Nobody involved could tell you what standard it met, because there is no longer anyone in the loop who holds one.

A great power has been placed in the hands of people who were not asked to earn it, and the only question that has ever mattered about such a power is what binds it. We are building the bindings now, in public, at speed, badly. The word for a well-made binding is yantra. The tradition's view was that the restraint is the instrument, and everything else is just force looking for somewhere to go.
