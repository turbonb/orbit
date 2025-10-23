# Landing Page — Forms & Messaging

## Contact Form CTA

```html
<h2 class="bottom-margin-20px">Partner with us</h2>
<p class="grey-text bottom-margin-60px">
  If you’re someone who’s looking to bring a space to life, share a few details
  to help me reach out to you so we can discuss how to bring your vision to
  life.
</p>
<div class="w-form">
  <form id="wf-form-Contact-Form" name="wf-form-Contact-Form" method="get">
    <div class="form-field-wrapper">
      <label for="Name" class="form-label-2">Your full name</label>
      <input
        class="form-field w-input"
        maxlength="256"
        name="Name"
        id="Name"
        type="text"
      />
    </div>
    <div class="form-field-wrapper">
      <label for="Email" class="form-label-2">Your email address</label>
      <input
        class="form-field w-input"
        maxlength="256"
        name="Email"
        id="Email"
        type="email"
        required
      />
    </div>
    <div class="form-field-wrapper">
      <label for="Message" class="form-label-2"
        >A little bit about your project</label
      >
      <textarea
        class="form-field w-input"
        id="Message"
        name="Message"
        placeholder="Example Text"
      ></textarea>
    </div>
    <input
      type="submit"
      value="Submit"
      data-wait="Please wait..."
      class="primary-button w-button"
    />
  </form>
  <div class="w-form-done">
    <div>
      Thanks for reaching out! We'll get back to you as soon as possible.
    </div>
  </div>
  <div class="w-form-fail">
    <div>
      Oops! Something went wrong while submitting the form. You can try again or
      directly email me at
      <a href="mailto:hello@gordonc.com">hello@gordonc.com</a>.
    </div>
  </div>
</div>
```

### Notes

- Uses Webflow native success and error messages referencing fallback email `hello@gordonc.com`.
- Submit button shows `Please wait...` while processing.

## Newsletter Signup (Footer)

```html
<h3 class="bottom-margin-small">Newsletter</h3>
<div class="w-form">
  <form
    id="wf-form-Newsletter-Form"
    name="wf-form-Newsletter-Form"
    method="get"
  >
    <div class="form-field-wrapper">
      <label for="newsletter-email" class="form-label"
        >Your email address</label
      >
      <input
        class="form-field w-input"
        maxlength="256"
        name="Email"
        id="newsletter-email"
        type="email"
        required
      />
    </div>
    <input
      type="submit"
      value="Submit"
      data-wait="Please wait..."
      class="primary-button w-button"
    />
  </form>
  <div class="w-form-done"><div>Thank you for joining!</div></div>
  <div class="w-form-fail">
    <div>
      Oops! Something went wrong while submitting the form. You can try again or
      directly email me at
      <a href="mailto:hello@gordonc.com">hello@gordonc.com</a>.
    </div>
  </div>
</div>
```

### Notes

- Shares the same messaging pattern and fallback email as the contact form.
- Leveraging Webflow default form validation/handling; no custom logic beyond Webflow's built-in form scripts.
