# Parent guide delivery email (dashboard edit needed)

Automation: **Parent Leads Nurture Sequence** (id 188201726456628307, live, triggers on group "Parent Leads" 188021995515937985).
First email step: **"Immediate - Free Guide"**.

The MailerLite API refuses edits while an automation is active, and this is a designed email, so the edit has to happen in the dashboard: pause the automation, edit the email, reactivate (same routine as the tracker welcome email).

## The two things to change

1. **The download button links to a Google Drive document holding the old guide.** Point it at the site PDF instead, so it always serves the current version:
   `https://alevelaccelerators.com/ALevel-Accelerators-Parent-Guide.pdf`
   (Do this after the refreshed guide has been deployed, or the link serves the old design.)
2. **Refresh the body copy** so it matches what the rewritten guide actually contains.

## Ready-to-paste body copy

Subject (unchanged): {$name} Here's Your Free A-Level Guide!

Hi {$name},

Thank you for downloading the parents' guide. Your copy is on the button below.

Before you read it, here's the one thing to hold onto. If your child is working hard and the grades aren't moving, that isn't a motivation problem. It's a method problem. Most revision builds knowledge. The exam tests performance under pressure. Two different skills, and the second one is rarely taught.

The guide covers why that happens (the four tiers of exam performance), three questions to ask your child this week, and a plan you can start tonight with our free tools:

The Revision Diagnostic: 20 questions, about 4 minutes. Your child gets a report showing exactly what to fix first.
https://alevelaccelerators.com/revision-diagnostic

The Revision Tracker: they rate their topics honestly and it builds their week around the weakest ones.
https://alevelaccelerators.com/revision-tracker

The Sunday Session: my free weekly email for students. One revision method every Sunday at 5pm.
https://alevelaccelerators.com/newsletter

Any questions, just reply to this email. I read every reply.

Dr Waleed Ahmad, MBBS
Founder, A-Level Accelerators
