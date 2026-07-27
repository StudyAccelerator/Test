# Higgsfield prompt bank (built 22 July 2026)

A paste-ready bank of 250+ prompts for the 24-hour free Higgsfield window, tuned to the A-Level Accelerators brand and the three pushes that matter right now: the revision diagnostic, the Summer Accelerator (cohort starts Saturday 8 August 2026), and A-level results day.

**Date correction, load-bearing:** A-level results day 2026 is **Thursday 13 August**, results to students at 8am (JCQ). Not 14 August. GCSE results follow on Thursday 20 August. Every prompt and overlay line in this bank uses the correct dates. Do not generate anything that says 14 August.

## The files

| File | What it covers | Prompts |
|---|---|---|
| `01-meta-ads-revision-diagnostic.md` | Parent-facing Meta ad video + UGC scripts for the diagnostic, plus student Reels-placement variants | 32 |
| `02-meta-ads-summer-accelerator.md` | Launch creative for the 8 August cohort, parent and student angles | 26 |
| `03-results-day-pack.md` | Countdown, day-of, beat-your-prediction and missed-your-grades support creative | 27 |
| `04-website-broll-and-heroes.md` | Palette-locked ambient loops and section backgrounds for the site | 30 |
| `05-website-animations-and-explainers.md` | Image-to-video on real assets, plus method explainer animations | 21 |
| `06-short-form-social.md` | Student-facing TikTok/Reels visual hooks, b-roll and loops | 42 |
| `07-linkedin-and-founder-avatar.md` | LinkedIn-safe inserts plus Speak/Talking Avatar scripts in Waleed's voice | 19 |
| `08-stills-image-bank.md` | Soul photo prompts: ad stills, blog headers, backplates, seasonal library | 41 |
| `09-method-visual-library.md` | Evergreen visual metaphors of the method, reusable everywhere | 23 |

## How each prompt is formatted

Every entry has an ID (so you can tick off what you have generated), the paste-ready prompt in a code block, and a format line telling you the aspect ratio, rough duration, and which Higgsfield tool it fits. Where an overlay text line helps, it is given separately; add it in post (CapCut or Canva) unless the note says it is safe to bake in. Copy the code block, paste, run. Nothing needs editing.

## Which Higgsfield tool for what

Confirmed against Higgsfield's July 2026 lineup:

- **Text-to-video** (Seedance 2.0, Veo 3.1, Kling 3.0, Sora 2, WAN 2.6, or whichever model the free window covers): all prompts marked "text-to-video". They are model-agnostic; if the free day is limited to one model, everything still runs.
- **Image-to-video** (upload a still, add motion): prompts marked "image-to-video", including every prompt in file 05 that animates a real asset. Real screenshots animated this way always beat generated fakes.
- **Cinema Studio / camera presets** (70+ moves: dolly, crane, crash zoom, 360 orbit, bullet time): where a prompt names a camera move, you can either leave it in the text or pick the matching preset. Either works.
- **Soul 2.0** (photo model): everything in file 08. Use **Soul ID** to build one consistent "recurring student" character early in the day, then reuse them across ad shots so the creative feels like one campaign.
- **Speak / Talking Avatar / Lipsync Studio**: the scripts in file 07. Upload a real photo of Waleed, paste the script. Only Waleed's own likeness, nobody else's.
- **UGC Factory**: the UGC scripts in files 01 and 02 (character, script, environment in one pipeline). Pick UK-plausible characters and homes.

## The brand look (baked into every prompt)

- Colours: deep purple #2E2557, gold #C9A96E, cream #FBF8F3 and #F3EBD8, dark ink #1a1535. Purple and gold are accents; cream is the field.
- Feel: premium, calm, credible. Warm natural light, editorial restraint, one idea per shot. Never a busy study-gram collage, never neon, never US high school.
- Type on screen: serif for statement lines (Georgia feel), clean sans for small text. Most video models mangle text, so overlays go on in post; anything over four words is never baked into a generation.
- Every people prompt carries anti-AI-look language (handheld, natural window light, slight imperfection, documentary feel). Waleed confirmed on 16 July that obviously-AI or heavily designed visuals underperform and LinkedIn now suppresses them; the bank is written to dodge that look, and file 07 explains where AI clips are safe to use at all.

## Hard rules (same honesty rules as everything else in this repo)

1. **No fake testimonials, ever.** No prompt here generates an actor claiming to be a real student, and no real student quote is ever lip-synced onto a generated face. Real quotes (Maahil, Naysa, Jay, Catherine and the rest of the wall) appear only as text overlays with honest attribution over illustrative footage.
2. **No grade-outcome claims.** Overlay lines and scripts use only approved proof points: Dr Waleed Ahmad MBBS, foundation-year doctor; 1,000+ A-level students taught; the 6.2 to 8.3 confidence rise (74 responses) with its framing intact. Nothing about A* percentages or grade jumps.
3. **No fake UI.** Never generate the diagnostic, the tracker, MailerLite or any screen. Screens come from real screenshots, animated via image-to-video (file 05).
4. **UGC characters are characters.** The UGC Factory parents and students speak as "a parent" or "a student", never named, never presented as customers.
5. Generation only. Nothing in this bank deploys, posts, schedules or publishes anything. Everything generated lands in a folder for Waleed to review and use.
6. All overlay and script copy follows the content rules (British English, Waleed's voice, no em dashes, no AI-tell vocabulary, no invented numbers).

## Unlimited mode: the settings that make it free (checked 22 July 2026)

The free window is a WEB APP feature, not an API one. Waleed's account confirmed it live: generation through the Higgsfield MCP connection bills credits no matter what, so all volume generation happens in the browser with the **Unlimited mode toggle switched ON** before every run. Only four video models qualify, and only inside these caps:

| Unlimited model | Max duration | Resolution | Aspect ratios | Best used for |
|---|---|---|---|---|
| **Kling 3.0** | 8s | 720p (pick "pro/std", not 4K) | 16:9, 9:16, 1:1 | People, emotion, image-to-video on real assets, camera moves |
| **Seedance 2.0** | 8s | 720p | 16:9, 9:16, 1:1, 3:4, 4:3, 21:9 | Volume b-roll, objects, macro, anything needing 3:4 for Meta feed |
| **Wan 2.7** | 5s | 720p | no ratio control (16:9 default; a start frame sets the ratio) | Texture loops, stylised abstract shots, audio-synced clips |
| **Gemini Omni Flash** | 7s | 720p | 16:9, 9:16 | Reference-driven shots and native-audio clips |

What the warm-up run on 22 July actually confirmed (all nine video samples generated at zero cost, balance never moved):

- The workflow per clip: pick the model, click the "Change to ... for Unlimited" link if the settings row shows 4K/1080p, switch **Unlimited mode** ON, and only press Generate when the button itself reads "Generate Unlimited" with no credit number. If a number is showing, something reset; fix it first.
- The Unlimited toggle silently resets OFF after some page re-renders and model switches. Check it every single time.
- **One unlimited generation runs at a time** (the toast says so) and a Generate press while another job is rendering is DROPPED silently, no error. Wait for the current clip to finish, then submit the next. A clip takes roughly one to three minutes on the relaxed trial queue.
- Real caps differ per model (table above): Wan tops out at 5s and has no aspect ratio control, Gemini Omni Flash at 7s. Kling and Seedance do the full 8s.
- Soul stills are NOT free on this account: the image Generate button prices at 2 credits, so the warm-up's sample 8 was skipped. Stills wait for a decision (pay the ~2 credits each, or skip Soul until a plan covers it).

### Waleed's verdict on the warm-up (22 July): personalised beats generic

The text-to-video warm-up proved the pipeline but Waleed's review call stands as the standing rule: generic b-roll (rooftops, mugs, dominoes) is replaceable by stock footage and shows AI physics tells, so the free window belongs to **image-to-video on real photos**: Waleed himself (scrubs on the ward, graduation portraits, theatre cap) and later real students and real site screenshots. Four personalised Kling 3.0 clips were generated that day from his own photos at zero cost (in `~/Downloads/higgsfield-warmup/personalised/`), with subtle-motion prompts that keep his face true to the photo. With a start image, Kling locks the clip to the photo's aspect ratio and ignores the ratio control. One web-app gotcha: injecting a new start frame does not replace the old one; remove the existing frame (X on the thumbnail) and visually confirm the new photo is in the tile before generating, or the previous image silently gets reused.
- The bank's 4:5 ad prompts: generate at **3:4 on Seedance or Wan** and crop the sliver to 4:5 in post, or run 9:16 and crop. Kling has no 3:4, so route 4:5 work to Seedance first.
- Every prompt in this bank fits inside 8 seconds already, so nothing needs rewriting. Ignore any "10 seconds" format note while in the free window; run it at 8.
- 720p is fine for social and ads. For website hero loops, upscale the best takes afterwards (the web app's upscaler) rather than generating at high resolution.
- Stills: Soul runs in the web app under the plan's image allowance; the video-only unlimited list above does not apply to images.
- Model-per-file quick route: files 01 to 03 people shots on Kling 3.0, object and abstract shots on Seedance; file 04 loops on Wan 2.7 (Kling for the camera glides); file 05 real-asset animations on Kling 3.0 with the screenshot as start image; file 06 volume on Seedance, movement-heavy shots on Kling; file 07 inserts on Seedance; file 09 tracking-shot metaphors on Kling or Gemini Omni Flash, textures on Wan.

### The nine-sample warm-up (one per file, paste these first)

| # | Prompt | Model | Settings (Unlimited ON) |
|---|---|---|---|
| 1 | 01 file, A1 kitchen light at 11pm | Seedance 2.0 | 8s, 3:4, 720p, audio off |
| 2 | 02 file, D1 sand timer | Wan 2.7 | 8s, 3:4, 720p |
| 3 | 03 file, F1 sunrise over rooftops | Kling 3.0 | 8s, 16:9, 720p, sound off |
| 4 | 04 file, A1 staircase of light | Kling 3.0 | 8s, 16:9, 720p, sound off |
| 5 | 05 file, B2 Active Recall flashcards | Seedance 2.0 | 8s, 9:16, 720p, audio off |
| 6 | 06 file, E1 flashcard shuffle | Kling 3.0 | 8s, 9:16, 720p, sound off |
| 7 | 07 file, A4 tea steam over notes | Seedance 2.0 | 4s, 1:1, 720p, audio off |
| 8 | 08 file, B6 doctor's desk still | Soul 2.0 (image) | 3:4, then crop 4:5 |
| 9 | 09 file, M2 dominoes with one gap | Gemini Omni Flash | 8s, 16:9, 720p |

Run these nine first: they prove each file's style works, one per use case, before you commit hours to volume.

## Suggested order for the 24 hours

Ads decay fastest and matter most, so generate in this order:

1. **Hours 1 to 6:** file 01 (diagnostic ads) and file 02 (Summer Accelerator ads), 4:5 first, then 9:16 variants. These feed the live Facebook push and the 8 August launch.
2. **Hours 6 to 10:** file 03 (results day). Everything must exist before 13 August; this window is the cheapest way to stock it.
3. **Hours 10 to 14:** file 08 stills on Soul. Build the Soul ID character first, then batch the ad stills and blog headers.
4. **Hours 14 to 18:** files 04 and 05 (website loops and asset animations).
5. **Hours 18 to 22:** file 06 (short-form b-roll library) and file 09 (method metaphors). These never expire; volume wins here.
6. **Final hours:** file 07 avatar takes, then rerun the best performers from earlier with different camera presets for variety.

Practical notes for the day: run 4:5 for Meta feed, 9:16 for Reels/Stories/TikTok, 16:9 for the website. Rerun any winner three or four times; picking the best of several takes is the whole game with video models. Name downloads by prompt ID as you go or sorting them later will hurt.
