
import { createClient } from 'pexels';
import { useQuery } from '@tanstack/react-query';

const client = createClient('LweLlBOon8R8Wa7ObuMahY3ROdFmx8QfQjxV14ZJ9GmNoFGvZJgJna85');

export const useCountryImages = (country) => {
  return useQuery({
    queryKey: ['countryImages', country],
    queryFn: async () => {
      try {
        const query = country;
        const response = await client.photos.search({ query, per_page: 5 });
        if (response.photos.length > 0) {
          return response.photos.map(photo => photo.src.large);
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

