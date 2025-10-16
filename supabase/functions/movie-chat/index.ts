import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // System prompt for movie recommendations
    const systemPrompt = `You are an expert movie recommendation assistant. You help users discover movies based on their preferences, mood, and interests. 

Available movies database:
1. The Shawshank Redemption (1994) - Drama, 9.3/10 - Frank Darabont
2. The Godfather (1972) - Crime, 9.2/10 - Francis Ford Coppola
3. The Dark Knight (2008) - Action, 9.0/10 - Christopher Nolan
4. 12 Angry Men (1957) - Drama, 8.9/10 - Sidney Lumet
5. Schindler's List (1993) - Drama, 8.9/10 - Steven Spielberg
6. Pulp Fiction (1994) - Crime, 8.9/10 - Quentin Tarantino
7. The Lord of the Rings: The Fellowship of the Ring (2001) - Fantasy, 8.8/10 - Peter Jackson
8. Forrest Gump (1994) - Drama, 8.8/10 - Robert Zemeckis
9. Fight Club (1999) - Thriller, 8.8/10 - David Fincher
10. Inception (2010) - Sci-Fi, 8.8/10 - Christopher Nolan
11. Star Wars: The Empire Strikes Back (1980) - Sci-Fi, 8.7/10 - Irvin Kershner
12. The Matrix (1999) - Sci-Fi, 8.7/10 - Wachowski Brothers
13. Goodfellas (1990) - Crime, 8.7/10 - Martin Scorsese
14. Interstellar (2014) - Sci-Fi, 8.6/10 - Christopher Nolan
15. Parasite (2019) - Thriller, 8.6/10 - Bong Joon Ho
16. The Silence of the Lambs (1991) - Thriller, 8.6/10 - Jonathan Demme
17. Saving Private Ryan (1998) - War, 8.6/10 - Steven Spielberg
18. The Green Mile (1999) - Drama, 8.6/10 - Frank Darabont
19. Life is Beautiful (1997) - Comedy, 8.6/10 - Roberto Benigni
20. Se7en (1995) - Thriller, 8.6/10 - David Fincher
21. Spirited Away (2001) - Animation, 8.6/10 - Hayao Miyazaki
22. The Pianist (2002) - Drama, 8.5/10 - Roman Polanski
23. The Departed (2006) - Crime, 8.5/10 - Martin Scorsese
24. The Usual Suspects (1995) - Mystery, 8.5/10 - Bryan Singer
25. American History X (1998) - Drama, 8.5/10 - Tony Kaye
26. The Intouchables (2011) - Comedy, 8.5/10 - Olivier Nakache
27. Gladiator (2000) - Action, 8.5/10 - Ridley Scott
28. Whiplash (2014) - Drama, 8.5/10 - Damien Chazelle
29. The Prestige (2006) - Mystery, 8.5/10 - Christopher Nolan
30. Back to the Future (1985) - Adventure, 8.5/10 - Robert Zemeckis
31. The Lion King (1994) - Animation, 8.5/10 - Roger Allers
32. Django Unchained (2012) - Western, 8.4/10 - Quentin Tarantino
33. Memento (2000) - Thriller, 8.4/10 - Christopher Nolan
34. WALL-E (2008) - Animation, 8.4/10 - Andrew Stanton
35. Oldboy (2003) - Thriller, 8.4/10 - Park Chan-wook
36. Eternal Sunshine of the Spotless Mind (2004) - Romance, 8.3/10 - Michel Gondry
37. Braveheart (1995) - Drama, 8.3/10 - Mel Gibson
38. Toy Story (1995) - Animation, 8.3/10 - John Lasseter
39. Inglourious Basterds (2009) - War, 8.3/10 - Quentin Tarantino
40. A Beautiful Mind (2001) - Drama, 8.2/10 - Ron Howard
41. There Will Be Blood (2007) - Drama, 8.2/10 - Paul Thomas Anderson
42. Up (2009) - Animation, 8.2/10 - Pete Docter
43. Jurassic Park (1993) - Adventure, 8.1/10 - Steven Spielberg
44. Mad Max: Fury Road (2015) - Action, 8.1/10 - George Miller
45. No Country for Old Men (2007) - Thriller, 8.1/10 - Coen Brothers
46. The Truman Show (1998) - Drama, 8.1/10 - Peter Weir
47. The Grand Budapest Hotel (2014) - Comedy, 8.1/10 - Wes Anderson
48. V for Vendetta (2005) - Action, 8.1/10 - James McTeigue
49. Blade Runner 2049 (2017) - Sci-Fi, 8.0/10 - Denis Villeneuve
50. Her (2013) - Romance, 8.0/10 - Spike Jonze
51. Casino Royale (2006) - Action, 8.0/10 - Martin Campbell
52. Avatar (2009) - Sci-Fi, 7.8/10 - James Cameron
53. Titanic (1997) - Romance, 7.8/10 - James Cameron

When recommending movies:
- Consider the user's stated preferences (genre, mood, director preferences)
- Use collaborative filtering logic: if they like one movie, recommend similar ones
- Explain why you're recommending each movie based on specific attributes
- Be conversational and enthusiastic
- Ask follow-up questions to refine recommendations
- Mention ratings, directors, and genres to help users make informed choices
- Consider themes, tone, and storytelling styles when making recommendations`;

    console.log('Sending request to AI with messages:', messages);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');

    return new Response(
      JSON.stringify({ response: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in movie-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
