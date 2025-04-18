import path from "path"
import moduleAlias from "module-alias"

moduleAlias.addAliases({
  "@data": path.join(__dirname, "..", "data"),
  "@client": path.join(__dirname, "..", "client"),
  "@config": path.join(__dirname, "..", "config"),
  "@commands": path.join(__dirname, "..", "commands"),
  "@events": path.join(__dirname, "..", "events"),
  "@utils": path.join(__dirname, "..", "utils"),
})