# AskWinn — PRD

## Original Problem Statement
> I want to build a one stop sourcing platform where the users who are starting business work can find the manufacturing agents who can do end to end product management.

Platform name: **AskWinn**.

## Architecture
- **Backend**: FastAPI + MongoDB (motor) + Emergent Google OAuth + Emergent LLM key (LLM + object storage)
- **Frontend**: React 19 + react-router-dom 7 + Tailwind + editorial Shadcn overrides
- **Design**: Bold editorial — bone #F9F9F6, Klein blue #002FA7, burn orange #FF4500, Cormorant Garamond + Manrope + IBM Plex Mono

## Personas
- **Buyer** — founder posting RFQs
- **Vendor / Agent** — manufacturing agent receiving RFQs, bidding, fulfilling
- **Admin** — moderates + verifies vendors

## Core Vendor Journey (from requirement sheet)
- Phase 1: Registration + KYC + verification + (stubbed) onboarding fee
- Phase 2: Vendor dashboard with metrics
- Phase 3: RFQ notification, anonymous detail view, bid submission
- Phase 4: Order fulfilment with status flow + (stubbed) escrow
- Phase 5: Vendor scoring, badges, repeat & referral

## What's been implemented (running totals through iteration 5)

| Iter | Date | Focus | Tests |
|---|---|---|---|
| 1 | 2026-04-23 | MVP — auth, profiles, RFQ, quotes, AI match, messaging, reviews, admin | 17/17 |
| 2 | 2026-04-23 | Pre-OAuth role pick + pluggable AI bid evaluator | 24/24 |
| 3 | 2026-04-23 | Rebrand AskWinn + contact_number on quote + Accept Winner | 30/30 |
| 4 | 2026-04-30 | Guided RFQ wizard (Beauty/Textile/Electronics) + file uploads | 45/45 |
| 5 | 2026-04-30 | Vendor workflow Phases 1-5 (KYC, metrics, anonymisation, status flow, score+badges); ISSUE overline removed | 59/59 |
| 6 | 2026-04-30 | P0+P1 — Save Favourites, Public RFQ share link, Chat file attachments | 97/97 |

### 2026-04-30 — Iteration 6: Save Favourites + Public RFQ + Chat attachments
- **P0 Save Favourites** (`favourites` collection): buyers bookmark agents
  - `POST /api/favourites/{agent_id}` — idempotent add (upsert + $setOnInsert)
  - `DELETE /api/favourites/{agent_id}` — remove
  - `GET /api/favourites` — list with full agent docs, newest first
  - `GET /api/favourites/ids` — fast id-only list for UI cache
  - Frontend: `<FavouriteButton agentId>` on AgentCard + AgentDetail; new `/favourites` page; nav "Saved" link for buyers
- **P0 Public Shareable RFQ** (`share_token` field on `rfqs`):
  - `POST /api/rfqs/{id}/share` — generates `secrets.token_urlsafe(16)`, idempotent (returns existing)
  - `DELETE /api/rfqs/{id}/share` — revoke
  - `GET /api/public/rfqs/{token}` — sanitised read-only payload (NO buyer_id, NO attachments storage paths, NO bidder identities; only title/brief/qty/budget/timeline/structured-requirements/attachment_count/quote_count)
  - Frontend: Share panel on RFQDetail (copy/revoke); `/p/rfq/:token` public page with editorial layout + bid CTA
- **P1 Chat file attachments**:
  - `Message.attachments: List[dict]`; body or attachment required
  - `POST /api/messages/attachment?recipient_id=X` — uploads to Emergent Object Storage (`askwinn/messages/{thread_id}/{file_id}.{ext}`); same 20MB cap + ALLOWED_EXTS as RFQ
  - `POST /api/messages` accepts `attachments: [...]`
  - `GET /api/messages/{message_id}/attachment/{file_id}` — sender/recipient/admin only (403 otherwise); cookie/Bearer/`?auth=` auth modes
  - Frontend: Paperclip icon in composer, pending-attachments tray with remove, attachment cards in messages with download

### Stubbed (pending external integrations)
- Razorpay onboarding fee (Phase 1.4) and escrow (Phase 4.12, 4.14) — needs key
- WhatsApp notifications via Wati/Interakt (Phase 3.7, 3.10, 4.11) — banners only for now
- GST government API verification (Phase 1.3) — admin manual verify only
- Resend email notifications — pending API key

## Prioritized backlog

### P0
- ✅ ~~Buyer "save favourites" agent list~~ (iter 6)
- ✅ ~~Public shareable RFQ link~~ (iter 6)

### P1
- ✅ ~~File attachments inside chat threads~~ (iter 6)
- Resend email notifications (needs key)
- Razorpay onboarding fee + escrow at sample order
- WhatsApp notifications (Wati/Interakt)
- Structured forms for remaining categories

### P2
- Stripe escrow (alternative if buyers are global)
- Self-hosted Ollama bid evaluator
- Repeat order & referral credit system (Phase 5.17)
- Optional expiry / TTL on RFQ share tokens
- Per-message attachment count cap (currently unlimited per thread)

## Integrations
- Emergent Google OAuth — login
- Emergent Universal LLM Key — Claude Sonnet 4.5 (agent match) + Gemini 2.5 Flash Lite (bid eval)
- Emergent Object Storage — RFQ attachments, message attachments
