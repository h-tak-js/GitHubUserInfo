'use strict';
document.addEventListener("DOMContentLoaded", function () {
  function fetchUserInfo(user_id) {
    return fetch(`https://api.github.com/users/${encodeURIComponent(user_id)}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          display_fetch_result(`<p><em>取得できませんでした。</em></p>`);
          return Promoise.reject(new Error(`${response.status}:${response.statusText}`));
        }
      });
  }
  const button_submit = document.getElementsByName('submit')[0];
  button_submit.addEventListener('click', () => {
    const input_user_name = document.getElementsByName('user_name')[0];
    fetchUserInfo(input_user_name.value)
      .then((user_info) => create_view(user_info))
      .then((view) => display_result(view))
      .catch((error) => {
        console.log(`エラーです${error}`);
      });
  });

  function create_view(user_info) {
    return escape_html`
    <h4>${user_info.name} (@${user_info.login})</h4>
    <img src="${user_info.avatar_url}" alt="${user_info.login}" height="100">
    <dl>
      <dt>Location</dt>
      <dd>${user_info.location}</dd>
      <dt>Repositories</dd>
      <dd>${user_info.public_repos}</dd>
    </dl>`;
  }

  function display_result(view) {
    const result = document.getElementById('result');
    result.innerHTML = view;
  }
});

function escape_special_cahrs(str) {
  return str
    .replace(/&/g, '&amp')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039');
}

function escape_html(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === 'string') {
      // 値が文字列型であればエスケープ
      return result + escape_special_cahrs(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}