<script>
  import Prose from "$lib/components/Prose.svelte";
</script>

<Prose>
  <p>
    This is an unofficial <b>timetable app</b> for <b>CoSy Festival 2025</b>.
    I'm not affiliated with the festival but I wanted to contribute something
    useful! If you found an error in the timetable, <b>let me know via</b>
    <a href="https://t.me/similicious" target="_blank">Telegram</a>!
  </p>

  <h2>Install</h2>

  <p>
    You can <b>add this website to your homescreen</b>. The website will then
    become available offline.
    <a href="https://www.installpwa.com/from/cosy.tmtbl.de" target="_blank">
      See here how it's done!
    </a>
  </p>

  <h2>Share</h2>

  <img
    src="/qr-code.svg"
    alt="QR Code containing a link to this app"
    class="mb-0 h-auto w-full p-5"
  />

  <h2>Made with ❤️ by similicious</h2>

  <p>
    Hi, I'm <a href="https://github.com/similicious" target="_blank">
      similicious
    </a>
    and I built this app in my free time. This timetable app is free software, feel
    free to
    <a href="https://github.com/similicious/festival-timetable" target="_blank">
      check out the code
    </a>
    and use it for your event! I'm also happy to hear your feedback. Contact me via
    <a href="https://t.me/similicious" target="_blank">Telegram</a>.
  </p>

  <h2>Credits</h2>

  <p>
    The app logo is created by <a
      href="https://www.flaticon.com/free-icons/disco-ball"
      target="_blank"
      title="disco ball icons"
    >
      Ehtisham Abid - Flaticon
    </a>. Thank you! 💃
  </p>
</Prose>

<p class="mt-2 text-xs text-zinc-400">
  Built on {BUILD_DATE} from
  <a
    href="https://github.com/similicious/festival-timetable/commit/{BUILD_COMMIT}"
    target="_blank"
    class="underline"
  >
    {BUILD_COMMIT}
  </a>
</p>
