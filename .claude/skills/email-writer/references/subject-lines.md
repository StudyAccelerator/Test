# Subject lines and preview text

The subject line is the promise; the email has to keep it. Ian Stanley's rule from "Just F*cking Send It" (his PDF is in Waleed's Downloads; the distilled playbook is in `content/email-broadcasts/README.md`): the goal is a from-name people open on sight, but until then the subject line does the work, and "curiosity + benefit" wins almost every test.

## Waleed's own edits, which set the house style

| Session wrote | Waleed changed it to |
|---|---|
| your diagnostic report, {$name} | {$name} Here's Your Diagnostic Report & Next Steps Towards A* Grades |
| {$diag_child_name}'s revision diagnosis, in plain English | {$diag_child_name}'s Diagnostic Report & Next Steps Towards Top Grades |
| {$name}, one more thing about your report | {$name}, One More Thing About Your A-Levels |
| you know more than your grades show, {$name} | You're working hard, but the grades don't reflect it, {$name} |

What they teach: the reader's name goes in, usually first; Title Case; the subject names the outcome the reader wants (top grades, A* grades, the next steps) rather than describing the email; and the wording is what a person would say, not a headline.

## The rules

1. **Name first, then a comma.** `{$name}, This Number Stops You Running Out Of Time`. In parent emails the child's name can replace it when the email is about the child.
2. **Title Case.** Every main word capitalised, small words (of, in, the, a, to) lower case unless first.
3. **Under 50 characters including the name** (count the name as five letters). Phones cut the rest. Use `validate_subject_lines` on the MailerLite connector, or count.
4. **Curiosity + benefit.** A specific benefit the reader cares about (stop running out of time, save marks, a higher predicted grade) plus one element that makes them wonder (This Number, The 2 Minute Habit, Why You Keep, What Teachers Look For).
5. **Sentence-shaped, not label-shaped.** "Why Students Run Out Of Time In Exams" reads as a sentence; "Exam Timing Tips" reads as a label. Labels lose.
6. **No clickbait.** If the email doesn't deliver the subject's promise, change the subject. Never "URGENT", never fake scarcity, never a question the email doesn't answer.
7. **Two subjects per email**, A and B, both meeting the rules, so an A/B test is always possible.

## Stanley's formulas, in our voice

- **Curiosity + benefit (the default):** `{$name}, This Number Stops You Running Out Of Time` / `The 2 Minute Habit That Saves Your Child Marks`
- **The mistake:** `{$name}, The Mistake That Costs Hard Workers Marks`
- **Why you / why they:** `{$name}, Why You Keep Running Out Of Time In Exams`
- **How to, when the benefit is strong enough:** `How To Get A Higher Predicted Grade This Term`
- **The question:** `{$name}, Is Your Revision Actually Sticking?`
- **Questions? and FAQ**, around any deadline, exactly as the book prescribes: `Questions?` then `Your Questions Answered`
- **The personal story:** `{$name}, I Was The Hard Worker With Nothing To Show For It`

## Preview text (the preheader)

This is the grey line inboxes show after the subject. MailerLite ignores the API's preheader field, so the engine bakes it into the email as a hidden first line; that is why it does not appear in MailerLite's own preview box, and why every review copy states it at the top.

Rules: it is a second hook, never a repeat of the subject; it adds the benefit the subject only hinted at ("It takes two minutes to work out before your next test, and most students have never been shown it."); 60 to 100 characters; complete sentence; no merge fields.
