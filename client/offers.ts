import React, { useState, useEffect } from "react";
import wretch from "wretch";

const BASE_URL = "http://localhost:9000";

const useOffers = (name: string) => {
  const [offers, setOffers] = useState({
    items: [],
    error: false,
    unfetched: true,
  });

  useEffect(() => setOffers((state) => ({ ...state, unfetched: true })), [
    name,
  ]);

  useEffect(() => {
    (async () => {
      try {
        if (offers.unfetched) {
          const response = await wretch()
            .url(`${BASE_URL}/offers/sports/${name}`)
            .get()
            .json();

          setOffers((state) => ({
            ...state,
            items: response.data, //todo
            unfetched: false,
          }));
        }
      } catch {
        setOffers((state) => ({ ...state, unfetched: false, error: true }));
      }
    })();
  }, [offers, name]);

  return { offers, setOffers };
};

const useOffer = (id: string) => {
  const [offer, setOffer] = useState({
    item: null,
    error: false,
    unfetched: true,
  });
  useEffect(() => {
    (async () => {
      try {
        if (offer.unfetched) {
          const response = await wretch()
            .url(`${BASE_URL}/offers/${id}`)
            .get()
            .json();

          setOffer((state) => ({ ...state, item: response, unfetched: true }));
        }
      } catch {
        setOffer((state) => ({ ...state, unfetched: false, error: true }));
      }
    })();
  }, [offer, id]);

  return { offer, setOffer };
};

export { useOffers, useOffer };
