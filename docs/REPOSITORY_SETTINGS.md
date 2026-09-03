# Repository settings

Apply these GitHub settings after the quality workflow has completed successfully at least once:

- Protect the `main` branch.
- Require the `verify` status check before merging.
- Require pull requests and resolved review conversations.
- Require one independent approval when more than one maintainer is available; a solo maintainer must complete the pull-request checklist.
- Require branches to be current before merge.
- Disable force pushes and branch deletion.
- Enable dependency alerts, secret scanning, and push protection where the repository plan supports them.

Repository administration is external state and is not changed by local setup. Record the maintainer and date here after applying it.

