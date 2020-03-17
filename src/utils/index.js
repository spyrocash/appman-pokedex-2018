const fetchJson = async url => fetch(url).then(res => res.json());

export { fetchJson };
