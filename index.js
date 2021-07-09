document.addEventListener("DOMContentLoaded", function () {
  function fetchUserInfo(user_id) {
    fetch(`https://api.github.com/users/${encodeURIComponent(user_id)}`)
      .then(response => {
        const result = document.getElementById('result');
        if (response.ok) {
          return response.json().then(user_info => {
            console.log(user_info);
            const view = `
                <h4>${user_info.name} (@${user_info.login})</h4>
                <img src="${user_info.avatar_url}" alt="${user_info.login}" height="100">
                <dl>
                    <dt>Location</dt>
                    <dd>${user_info.location}</dd>
                    <dt>Repositories</dd>
                    <dd>${user_info.public_repos}</dd>
                </dl>
                `;
            result.innerHTML = view;
          });
        } else {
          console.error("エラーレスポンス", response);
          result.innerHTML = `<p><em>取得できませんでした。</em></p>`
        }
      });
  }
  const input_user_name = document.getElementsByName('user_name')[0];
  input_user_name.addEventListener('change', () => {
    fetchUserInfo(input_user_name.value);
  });
});