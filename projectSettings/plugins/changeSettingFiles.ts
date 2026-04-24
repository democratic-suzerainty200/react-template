import { type Plugin, loadEnv } from "vite"
import { changeSettingFiles } from "../modules/changeSettingFiles"

export default function plugin(): Plugin {
	return {
		name: "Change setting files",

		configResolved(config) {
			const env = loadEnv(config.mode, process.cwd())
			changeSettingFiles(env)
		}
	}
}
