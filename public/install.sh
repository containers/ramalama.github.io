#!/bin/bash

main() {
  set -euo pipefail

  local url="https://raw.githubusercontent.com/containers/ramalama/s/install.sh"
  curl -fsSL "$url" | bash
}

main "$@"

