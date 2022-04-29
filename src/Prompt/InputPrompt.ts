import { BasePrompt } from "./BasePrompt";


export class InputPrompt extends BasePrompt {

	constructor(name: string, message: string) {
		super(name, "input", message);
	}

	public isValid() {
		if (!this.name || typeof this.name !== 'string') {
			return false;
		}

		if (!this.message || !["string", "function"].includes(typeof this.message)) {
			return false;
		}

		if (!["input"].includes(this.type)) {
			return false;
		}

		return true;
	}
}
