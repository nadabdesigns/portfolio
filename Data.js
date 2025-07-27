
console.log('hello')
let channelSlug = 'project-4-birds' // The “slug” is just the end of the URL


// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.querySelector('#channel-blocks')
	let highlightClass = 'highlight' // “Strings” (like a class name) are wrapped in quotes.
	let textBlock = document.querySelector('#bigSun') // Any selector.
	let switchButton = document.querySelector('#bigSun') // change this if you want somthing elese to trigger it 

	switchButton.onclick = () => { // “Listen” for clicks.
		textBlock.classList.toggle(highlightClass) // Toggle the class!
	}

	// Links!
	if (block.class == 'Link') {
		let linkItem =
			`
			<li>
				<p><em>Link</em></p>
				<picture>
					<source media="(max-width: 428px)" srcset="${block.image.thumb.url}">
					<source media="(max-width: 640px)" srcset="${block.image.large.url}">
					<img src="${block.image.original.url}">
				</picture>
				<h3>${block.title}</h3>
				${block.description_html}
				<p><a href="${block.source.url}">See the original ↗</a></p>
			</li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}



	// Want to click on item and then have it appear in the div when it's an image
	// set the class div for the images 
	// assign div with a class link 
	// create div logic
	// Set up our variables.

	// example from class


	//  let imagelisten 
	//  if imageName is clicked then display the same name of that imgage in the div

	// first let see if we can get image inside the div
	
	// Images Test!
	else if (block.class == 'Image') {
		// let can be changed when ever i want and const will be for forever


		let imageItem =

			`
			<div id="#all-blocks">
			${block.image.large.url}
			${block.title}
			
			</li>
			<img src="${block.image.original.url}">
			 </div>

	
			
			`
		// …up to you!
	}



	// Images!

	else if (block.class == 'Image') {
		// let can be changed when ever i want and const will be for forever
		console.log(block)
		

		let imageItem =`<p class="itemName">${block.title}`
		// …up to you!
	}



	// step one make the titles of the blocks appear in the text

	// Text!
	// make styling for text 
	// make a div
	else if (block.class == 'Text') {
		`
			<div class= textBlock>
				<p><em>Link</em></p>
				<picture>
					<source media="(max-width: 428px)" srcset="${block.image.thumb.url}">
					<source media="(max-width: 640px)" srcset="${block.image.large.url}">
					<img src="${block.image.original.url}">
				</picture>
				<h3>${block.title}</h3>
				${block.description_html}
				<p><a href="${block.source.url}">See the original ↗</a></p>
			</div>
			
			`

		// …up to you!
	}



	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition

		// Uploaded videos!
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
				<li>
					<p><em>Video</em></p>
					<video controls src="${block.attachment.url}"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {
			// …up to you!
		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li>
					<p><em>Audio</em></p>
					<audio controls src="${block.attachment.url}"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
				<li>
					<p><em>Linked Video</em></p>
					${block.embed.html}
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embed.includes('rich')) {
			// …up to you!
		}
	}
}



// It‘s always good to credit your work:
let renderUser = (user, container) => { // You can have multiple arguments for a function!
	let userAddress =
		`
		<address>
			<img src="${user.avatar_image.display}">
			<h3>${user.first_name}</h3>
			<p><a href="https://are.na/${user.slug}">Are.na profile ↗</a></p>
		</address>
		`
	container.insertAdjacentHTML('beforeend', userAddress)
}

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!

		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})
		// lets you stor things in the name 
		// Also display the owner and collaborators:
		let channelUsers = document.querySelector('#channel-users') // Show them together
		data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		renderUser(data.user, channelUsers)
	})