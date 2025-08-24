import { getPrometheusAvailabilityById } from "./prometheus";
import { compareLatestWithCurrent } from "./util";
import { Resend } from 'resend';
import { env } from "cloudflare:workers";

const apt_codes = {
	4884573: 'hiro',
	4989445: 'hadley',
	3848844: 'montrose',
	3845992: 'cobalt',
	4989446: 'tillery',
	3857931: 'iron works',
	4004472: '100 moffett',
	2757018: 'madera'
}
export default {
	async fetch(req) {
		return new Response('new response')
	},

	async scheduled(event, env, ctx) {
		console.log('scheduled operation running')
		let message = await compareLatestWithCurrent(3848844);
		console.log('got message' + message)
		const resend = new Resend(env.RESEND_API_TOKEN);
		console.log('email sending')
		await resend.emails.send({
			from: 'onboarding@resend.dev',
			to: ['stellasunxx@gmail.com', 'yoav.zimet@gmail.com'],
			subject: 'NI HAO, Apartment new INFO <33',
			html: `<h3>hihi, for Weize and Yoav:  <strong>${message}</strong>!</h3>`
		});
		console.log('email sent')
	},
};
