<script>
    let from = '';
    let subject = '';
    let message = '';

    async function handleSubmit() {
        const response = await fetch('http://localhost:8080/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from, subject, message}),
        });

        if (response.ok) {
            alert('I can assure you the email has been sent. Please allow 2-3 business days for response.');
        } else {
            alert('Failed to send email. Please try again later.');
        }
    }
</script>

<h2>Get in contact</h2>

<p>Let's chat. Send me an email with the form below. Use a real email address or I won't get back to you.</p>
<form on:submit|preventDefault={handleSubmit}>
    <label for="from">From:</label>
    <input id="from" bind:value={from} type="text" required placeholder="your@email.com"/>

    <label for="subject">Subject:</label>
    <input id="subject" bind:value={subject} type="text" required placeholder="hey, cool page" />

    <label for="message">Message:</label>
    <textarea id="message" bind:value={message} required placeholder="let's work together!" ></textarea>

    <button type="submit">Email me</button>
</form>

<style>
    :root {
        --page-width: 420px;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: var(--page-width);
        /*margin: 0 auto;*/
        /*padding: 20px;*/
        box-sizing: border-box;
        font-family: Arial, sans-serif;
    }

    label {
        margin-bottom: 5px;
        font-weight: bold;
    }

    input, textarea {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        box-sizing: border-box;
    }

    textarea {
        min-height: 100px;
        resize: vertical;
    }

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        background-color: var(--purple);
        color: var(--chartreuse);
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: var(--purple-light);
    }
</style>

