# Daily email production (the standing routine)

The daily broadcast only works if it's actually daily, and the book's biggest warning is inconsistency: a burst of daily emails followed by silence is worse than a steady rhythm. So production is batched weekly, exactly like the social content pack.

**The rhythm:** every Friday, the coming week's seven dailies get drafted into a dated folder here (`content/email-broadcasts/<monday-date>/`), loaded into MailerLite as draft campaigns by the engine, and handed to Waleed for one review. He approves the batch (or edits; repo copy changes first, then reload) and the campaigns get scheduled for 5pm UK daily. Sunday stays The Sunday Session's slot: when the newsletter is running, the Sunday daily is skipped; when it isn't, the Sunday email in the batch fills it.

**Where ideas come from, in priority order:**
1. Replies from the list (the clinic engine: every reply is tomorrow's email).
2. Whatever is true in the business that week (cohort dates, results moments, new free tools), the snapshot decides the push, never a hardcoded offer.
3. The seasonal calendar in content-studio's audience-and-offers reference.
4. The email-type rotation (paradigm shift, story, worst way, best way without, 80/20, Miyagi, results, value, lifestyle, FAQ), pick the type that fits the idea, and don't repeat a type two days running.
5. Waleed's life: hospital shifts, teaching moments, his own A-level memories. Personal stories are deposits; the notes-app habit (jot anything mildly interesting) feeds this.

**Rules per email:** one idea, one primary CTA at the end, a PS that may sell something else from the wheel, curiosity + benefit subject line, natural voice (28 Aug standard), compliance scan before load, no invented numbers, links to site pages or the call scheduler only (never Stripe).

**Metrics that matter** (the book's set): opens above 30 percent, clicks, replies, sales. Unsubscribes are not a steering metric; a rising spam rate is. If opens sag, fix subject lines and Promotions-tab formatting before touching cadence.

The scheduled task `daily-email-pack-friday` runs this routine each Friday morning; it drafts and loads, and never schedules or sends anything itself.
