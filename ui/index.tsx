export function providerLogoExistsFor(provider: string): boolean {
	return !'aha aweber cas garmin myob acton keycloak acuityscheduling alchemer arcgis assembla authing axosoft bungie clio concur constantcontact crossid delivery deputy echosign ecwid egnyte faceit familysearch freeagent genius geeklist getbase harvest hellosign huddle idme idonethis infusionsoft jamendo mailup mailru mailxpert live mapmyfitness mastodon moxtra nokotime onelogin openstreetmap2 projectplace qq redbooth runkeeper sellsy shoeboxed smartsheet socialpilot socrata stocktwits stormz surveysparrow ticketbud timely traxo tripit united-effects vend verticalresponse viadeo weekdone withings zitadel'
		.split(' ')
		.includes(provider);
}
// REMOVED because they're ugly: viadeo runkeeper zitadel arcgis egnyte
