<template>
	<ReactiveBase
		app="good-books-ds"
		url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		:enableAppbase="true"
	>
		<SearchBox
			className="result-list-container"
			componentId="BookSensor"
			:dataField="['original_title', 'original_title.search']"
			v-bind="subProps"
			v-on="subEvents"
			:enableAI="true"
		>
			<template #renderAIAnswer="slotProps">
				<div style="width: 100%; margin: 0 auto; font-family: Arial, sans-serif">
					<div style="display: flex; flex-direction: column; padding: 16px">
						<!-- User message -->
						<template v-if="slotProps.question">
							<div style="align-self: flex-end; margin-bottom: 8px; max-width: 90%">
								<div
									style="
										display: inline-block;
										background-color: #007bff;
										color: white;
										border-radius: 16px;
										padding: 8px 16px;
										white-space: pre-wrap;
										word-wrap: break-word;
									"
								>
									{{ slotProps.question }}
								</div>
							</div></template
						>

						<!-- AI message -->
						<div
							v-if="slotProps.loading"
							style="align-self: flex-start; margin-bottom: 8px; max-width: 70%"
						>
							<div
								style="
									display: inline-block;
									max-width: 100%;
									background-color: #f1f1f1;
									color: black;
									border-radius: 16px;
									padding: 8px 16px;
									white-space: pre-wrap;
									word-wrap: break-word;
								"
							>
								Loading...
							</div>
						</div>
						<div
							v-else
							style="align-self: flex-start; margin-bottom: 8px; max-width: 90%"
						>
							<div
								style="
									display: inline-block;
									max-width: 100%;
									background-color: #f1f1f1;
									color: black;
									border-radius: 16px;
									padding: 8px 16px;
									white-space: pre-wrap;
									word-wrap: anywhere;
								"
								v-html="getRenderMarkdown(slotProps.answer)"
							/>
						</div>

						<!-- Sources -->
						<div
							v-if="
								!slotProps.loading && slotProps.sources && slotProps.sources.filter(_ => _.original_title).length
							"
							style="align-self: flex-start; font-size: 12px; color: gray"
						>
							Sources:
							<div
								v-for="(source, index) in slotProps.sources.filter(_ => _.original_title)"
								:key="source.original_title"
							>
								{{ index + 1 }}. {{ source.original_title }}
							</div>
						</div>
					</div>
				</div>
			</template>
		</SearchBox>
		<SelectedFilters componentId="BookSensor" />
		<ReactiveList
			componentId="SearchResult"
			dataField="original_title.keyword"
			className="result-list-container"
			:pagination="true"
			:from="0"
			:size="5"
			:react="{ and: ['BookSensor'] }"
		>
			<template #renderItem="{ item }">
				<div class="flex book-content" key="item._id">
					<img :src="item.image" alt="Book Cover" class="book-image" />
					<div class="flex column justify-center ml20">
						<div class="book-header" v-html="item.original_title"></div>
						<div class="flex column justify-space-between">
							<div>
								<div>
									by <span class="authors-list">{{ item.authors }}</span>
								</div>
								<div class="ratings-list flex align-center">
									<span class="stars">
										<i
											v-for="(item, index) in Array(
												item.average_rating_rounded,
											).fill('x')"
											class="fas fa-star"
											:key="index"
										/>
									</span>
									<span class="avg-rating">({{ item.average_rating }} avg)</span>
								</div>
							</div>
							<span class="pub-year">Pub {{ item.original_publication_year }}</span>
						</div>
					</div>
				</div>
			</template>
		</ReactiveList>
	</ReactiveBase>
</template>
<script>
import { Remarkable } from 'remarkable';

const md = new Remarkable();
md.set({
	html: true,
	breaks: true,
	xhtmlOut: true,
	linkify: true,
	linkTarget: '_blank',
});

export default {
	name: 'SearchBoxWithCustomAIScreen',
	props: {
		subProps: Object,
		subEvents: Object,
	},
	methods: {
		getRenderMarkdown(param) {
			return md.render(param);
		},
	},
};
</script>

<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em;
	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	pre {
		margin: 10px auto;
	}
	table {
		margin: 10px auto;
		border-collapse: collapse;
		border-spacing: 0;
	}
	tr {
		border-bottom: 1px solid #ccc;
	}
	th,
	td {
		text-align: left;
		padding: 4px;
		border: 1px solid;
		border-collapse: collapse;
	}
	pre,
	code {
		padding: 0.6em 0.4em;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	}
	pre {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		white-space: pre-wrap;
	}
	code {
		line-height: normal;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		border-radius: 3px;
		font-size: 85%;
		padding: 0.2em 0.4em;
		margin-top: 5px;
		display: inline-block;
		overflow: auto;
		width: fit-content;
		max-width: 100%;
	}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	code[class*='language-'],
	pre[class*='language-'] {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		text-shadow: none;
	}
	ul,
	ol {
		padding-left: 1rem;
	}
	p {
		margin: 8px auto;
	}
}
pre {
	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	pre {
		margin: 10px auto;
	}
	table {
		margin: 10px auto;
		border-collapse: collapse;
		border-spacing: 0;
	}
	tr {
		border-bottom: 1px solid #ccc;
	}
	th,
	td {
		text-align: left;
		padding: 4px;
		border: 1px solid;
		border-collapse: collapse;
	}
	pre,
	code {
		padding: 0.6em 0.4em;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	}
	pre {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		white-space: pre-wrap;
	}
	code {
		line-height: normal;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		border-radius: 3px;
		font-size: 85%;
		padding: 0.2em 0.4em;
		margin-top: 5px;
		display: inline-block;
		overflow: auto;
		width: fit-content;
		max-width: 100%;
	}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	code[class*='language-'],
	pre[class*='language-'] {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		text-shadow: none;
	}
	ul,
	ol {
		padding-left: 1rem;
	}
	p {
		margin: 8px auto;
	}
	white-space: pre-wrap;
}
code {
	line-height: normal;
	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	pre {
		margin: 10px auto;
	}
	table {
		margin: 10px auto;
		border-collapse: collapse;
		border-spacing: 0;
	}
	tr {
		border-bottom: 1px solid #ccc;
	}
	th,
	td {
		text-align: left;
		padding: 4px;
		border: 1px solid;
		border-collapse: collapse;
	}
	pre,
	code {
		padding: 0.6em 0.4em;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	}
	pre {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		white-space: pre-wrap;
	}
	code {
		line-height: normal;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		border-radius: 3px;
		font-size: 85%;
		padding: 0.2em 0.4em;
		margin-top: 5px;
		display: inline-block;
		overflow: auto;
		width: fit-content;
		max-width: 100%;
	}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	code[class*='language-'],
	pre[class*='language-'] {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		text-shadow: none;
	}
	ul,
	ol {
		padding-left: 1rem;
	}
	p {
		margin: 8px auto;
	}
	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

}
pre {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	white-space: pre-wrap;
}
code {
	line-height: normal;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

code[class*='language-'],
pre[class*='language-'] {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}
code[class*='language-'],
pre[class*='language-'] {
	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	pre {
		margin: 10px auto;
	}
	table {
		margin: 10px auto;
		border-collapse: collapse;
		border-spacing: 0;
	}
	tr {
		border-bottom: 1px solid #ccc;
	}
	th,
	td {
		text-align: left;
		padding: 4px;
		border: 1px solid;
		border-collapse: collapse;
	}
	pre,
	code {
		padding: 0.6em 0.4em;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	}
	pre {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		white-space: pre-wrap;
	}
	code {
		line-height: normal;
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		border-radius: 3px;
		font-size: 85%;
		padding: 0.2em 0.4em;
		margin-top: 5px;
		display: inline-block;
		overflow: auto;
		width: fit-content;
		max-width: 100%;
	}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

	code[class*='language-'],
	pre[class*='language-'] {

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
pre {
	margin: 10px auto;
}
table {
	margin: 10px auto;
	border-collapse: collapse;
	border-spacing: 0;
}
tr {
	border-bottom: 1px solid #ccc;
}
th,
td {
	text-align: left;
	padding: 4px;
	border: 1px solid;
	border-collapse: collapse;
}
pre,
code {
	padding: 0.6em 0.4em; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

}
pre {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	white-space: pre-wrap;
}
code {
	line-height: normal; html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	border-radius: 3px;
	font-size: 85%;
	padding: 0.2em 0.4em;
	margin-top: 5px;
	display: inline-block;
	overflow: auto;
	width: fit-content;
	max-width: 100%;
} html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

code[class*='language-'],
pre[class*='language-'] {
	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr,
acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong,
sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table,
caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio,
video { margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline;
} pre { margin: 10px auto; } table { margin: 10px auto; border-collapse: collapse; border-spacing:
0; } tr { border-bottom: 1px solid #ccc; } th, td { text-align: left; padding: 4px; border: 1px
solid; border-collapse: collapse; } pre, code { padding: 0.6em 0.4em; /* Insert background color */
} pre { /* Insert text color */ white-space: pre-wrap; } code { line-height: normal; /* Insert text
color */ border-radius: 3px; font-size: 85%; padding: 0.2em 0.4em; margin-top: 5px; display:
inline-block; overflow: auto; width: fit-content; max-width: 100%; } /* Replace 'props.isSender',
'props.themePreset', and 'props.theme.colors' with actual values */ code[class*='language-'],
pre[class*='language-'] { /* Insert text color */ text-shadow: none; } ul, ol { padding-left: 1rem;
} p { margin: 8px auto; }

	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

		text-shadow: none;
	}
	ul,
	ol {
		padding-left: 1rem;
	}
	p {
		margin: 8px auto;
	}
	text-shadow: none;
}
ul,
ol {
	padding-left: 1rem;
}
p {
	margin: 8px auto;
}

code
{
	background: black; color: white; padding: 30px;
}
</style>
