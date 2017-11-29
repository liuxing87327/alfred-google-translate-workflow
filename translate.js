#!./node

var tjs = require('translation.js');

var source = process.argv[2] || 'auto';
var target = process.argv[3] || 'auto';
var query = process.argv[4] || '';
var target_display_name = process.argv[5];

tjs.translate({
		text: query,
		from: source,
		to: target
	})
	.then(res => {
		// console.log(JSON.stringify(res, null, "\t"));

		var output = {
			items: []
		};

		if (res.result) {
			res.result.forEach((data) => {
				if (data !== query) {
					output.items.push({
						title: data,
						subtitle: query,
						arg: data
					});
				}
			});
		}

        if (res.dict) {
            res.dict.forEach((data) => {
                if (data !== query) {
                    output.items.push({
                        title: data,
                        subtitle: query,
                        arg: data
                    });
                }
            });
        }

		console.log(JSON.stringify(output));
	}).catch(e => {
		console.error(e);
	});
