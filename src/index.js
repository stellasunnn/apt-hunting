import { getPrometheusAvailabilityById } from "./prometheus";
import { saveCurrentAvailability, getLatestAvailability } from "./db";
import { compareLatestWithCurrent } from "./util";
import { Resend } from 'resend';
import { env } from "cloudflare:workers";

export default {
	async fetch(req) {
		if (req.method === 'GET') {
			const res = await getPrometheusAvailabilityById(3848844)
			const response = JSON.stringify(res)
			// await saveCurrentAvailability('Montrose', 3848844, response)
			// const latest = await getLatestAvailability(3848844)
			const test = await compareLatestWithCurrent(3848844)
			return new Response(test)
		} else {
			return new Response('Invalid method', { status: 405 })
		}
	},

	async scheduled(event, env, ctx) {
		console.log('scheduled operation running')
		let message = await compareLatestWithCurrent(3848844);
		console.log('got message' + message)
		const resend = new Resend(env.RESEND_API_TOKEN);
		console.log('email sending')
		resend.emails.send({
			from: 'onboarding@resend.dev',
			to: ['stellasunxx@gmail.com', 'yoav.zimet@gmail.com'],
			subject: 'NI HAO, Apartment new INFO <33',
			html: `<h3>hihi, for Weize and Yoav:  <strong>${message}</strong>!</h3>`
		});
		console.log('email sent')
	},
};
