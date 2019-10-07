<div align="center">
  <h1>
    <br/>
    <br/>
    ️🤙
    <br />
    <br />
    AngelCS
    <br />
    <br />
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <a href="#">
      <img src="https://img.shields.io/badge/demos-🚀-yellow.svg" alt="demos" />
    </a>
    <br />
    AngelCS는 CS 매니저의 업무 효율을 극대화하는 서비스입니다.
    <br />
    Translations: <a href="#">🇬🇧</a>
  </sup>
  <br />
  <br />
  <br />
  <br />
  <pre>cd demo<br/>yarn start</pre>
  <br />
  <br />
</div>

![](process.gif)

<br />
<br />

**components**
  - `Home` &mdash; routed page component for home.
  - `Review` &mdash; routed page component for review management.
  - `ReviewCard` &mdash; display a review. onClick: props are pushed to `ReplyCard`.
  - `ReplyCard` &mdash; display a review and reply editor.
  - `Tag` &mdash; get text classified review type. recommend the reply template.
  - `Sidebar` &mdash; navigator.
  
<br />
<br />
<br />

**Synchronize `replyCard` with `reviewCard`**
  - update `reviewCard` : push `props` to `handleReviewSelect`, update `state.replyCard`.
  - update `replyCard` : push `state` to `handleReviewReply`, update `state.replyCard`.

<br />
<br />
<br />
<br />
<br />
