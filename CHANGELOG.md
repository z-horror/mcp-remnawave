# Changelog

## 2.0.0 — Remnawave 3.x support

Community fork of [TrackLine/mcp-remnawave](https://github.com/TrackLine/mcp-remnawave).

### Changed

- Bumped `@remnawave/backend-contract` `2.8.26 → ^3.4.15` (Remnawave API 3.x).
- User endpoints now use numeric `id` instead of `uuid`:
  - `users_get`, `users_update`, `users_delete`, `users_enable`, `users_disable`,
    `users_revoke_subscription`, `users_reset_traffic` accept `id` (number).
  - Bulk user tools accept `userIds` (number[], max 500):
    `users_bulk_update`, `users_bulk_reset_traffic`, `users_bulk_revoke_subscription`,
    `users_bulk_delete`, `users_bulk_update_squads`, `users_bulk_extend_expiration`.
  - `users_resolve` accepts `id` / `shortUuid` / `username`.
- `subscriptions_get_by_uuid` → `subscriptions_get_by_user_id` (numeric user ID).
- `subscriptions_get_connection_keys`, `ip_control_fetch_ips`, HWID device tools and
  user metadata tools now take a numeric user ID.
- `squads_add_users` / `squads_remove_users` accept numeric `userIds`
  (`bulk-actions/add-many-users`, `remove-many-users`).
- `external_squads_add_users` / `external_squads_remove_users` set/clear the per-user
  `externalSquadUuid` via bulk user update (3.x no longer has per-user membership lists).
- `hosts_bulk_set_inbound` / `hosts_bulk_set_port` now use `POST /api/hosts/bulk/update`.
- IP Control tools migrated to the 3.x **Connections** API.

### Removed

- `users_get_by_subscription_uuid` — the lookup endpoint no longer exists in 3.x.

### Added

- **Secret redaction**: Reality private keys, node secret keys, passwords, API tokens and
  subscription links are masked (`***REDACTED***`) in all tool and resource output.
  Disable with `REMNAWAVE_REDACT_SECRETS=false`.
- Handle empty/`204 No Content` API responses gracefully.
- MIT `LICENSE` file with attribution to the original project.
- `/docs-json`-free: user lookups by Telegram ID / email / tag are done by scanning the
  user list (dedicated endpoints were removed in 3.x).

### Notes

- Tested against Remnawave panel **3.4.4** (read operations + a controlled
  create/update/get/delete cycle) with `@remnawave/backend-contract` **3.4.15**.
