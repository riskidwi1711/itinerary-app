import { useQuery } from '@tanstack/react-query';

const PEXELS_API_KEY = 'LweLlBOon8R8Wa7ObuMahY3ROdFmx8QfQjxV14ZJ9GmNoFGvZJgJna85';
const PEXELS_API_URL = 'https://api.pexels.com/v1/search';

export const useCountryImages = (country) => {
  return useQuery({
    queryKey: ['countryImages', country],
    queryFn: async () => {
      try {
        const query = country;
        const response = await fetch(`${PEXELS_API_URL}?query=${query}&per_page=5`, {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.photos && data.photos.length > 0) {
          return data.photos.map(photo => photo.src.large);
        }
        return [];
      } catch (error) {
        console.error("Error fetching images from Pexels:", error);
        throw new Error("Failed to fetch images");
      }
    },
    enabled: !!country, // Only run the query if country is provided
  });
};