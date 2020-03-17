import { fetchJson } from "../utils";

const fetchCards = async () => fetchJson(`${process.env.REACT_APP_SERVICE}/api/cards`);

export { fetchCards };
