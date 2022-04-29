
export namespace Prompt {
	export type Parser<T = any> = (value: string, answers: T, config: Record<string, unknown>) => string;
	export type Choice = {
		name: string;
		value: string;
	};
	export type Choices<T = any> = Choice[] | ((answers: T, config: Record<string, unknown>) => Choice[]);

	export interface PromptQuestion<T = any> {
		type?: "input" | "password" | "list" | "checkbox" | "confirm";
		name?: string;
		message?: string | ((answers: T, config: Record<string, unknown>) => string);
		default?: string | number | boolean | [] | ((answers: T, config: Record<string, unknown>) => string);

		/**
		 * The prefix of the `message`.
		 */
		prefix?: string;

		/**
		 * The suffix of the `message`.
		 */
		suffix?: string;

		/**
		 * Post-processes the answer.
		 *
		 * @param input
		 * The answer provided by the user.
		 *
		 * @param answers
		 * The answers provided by the user.
		 */
		filter?(input: any, answers: T, config: Record<string, unknown>): any;

		/**
		 * A value indicating whether the question should be prompted.
		 */
		when?(answers: T, config: Record<string, unknown>): boolean;

		/**
		 * Process an answer after all prompts have been completed.
		 * */
		parser?: Parser;
		validate?(input: any, config: Record<string, unknown>, answers?: T): boolean | string | Promise<boolean | string>;
		choices?: Choices
	}

}

