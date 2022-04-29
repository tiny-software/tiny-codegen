#!/usr/bin/env node
import { InitialConfig } from './Config/InitialConfig';
import { parse } from './helpers/parsing.helpers';
import { ConfigResolver } from './ConfigResolver';
import { Runner } from './Runner';
import { CheckboxPrompt } from './Prompt/CheckboxPrompt';
import { ListPrompt } from './Prompt/ListPrompt';
import { InputPrompt } from './Prompt/InputPrompt';
import { CodeGen } from './CodeGen';
import { Template } from './Template';
import { Step } from './Step';
import { InquirerPromptProvider } from './Providers/PromptProvider/implementations/InquirerPromptProvider';

(async () => {
	try {
		const { config, answers } = await parse.argumentsToObject(process.argv);
		const initialConfig = InitialConfig.getInstance(config);
		initialConfig.extend({ answers });
		const resolver = new ConfigResolver(initialConfig);
		const ChosenScript = await resolver.resolve();
		const runner = new Runner(ChosenScript, new InquirerPromptProvider());
		await runner.run();
	} catch (error) {
		console.error(error?.message || error);
	}
})()

export {
	CheckboxPrompt,
	ListPrompt,
	InputPrompt,
	CodeGen,
	Template,
	Step
}
