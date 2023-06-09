
const url = "http://ec2-34-206-221-117.compute-1.amazonaws.com/v1/ai/caption/generate"; 

export const generatePost = async ( imageUrl, description, recommendationNumber, wordsLimit, language, platform ) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "image_url": imageUrl,
        "text_caption": description,
        "recommendation_count": recommendationNumber,
        "words_limit": wordsLimit,
        "platform": platform,
        "lang": language
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle the response data if needed
    const data = await response.json();
    return data.recommendations
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const uploadImage = async (formData) => {

  try {
    const response = await fetch('http://ec2-34-206-221-117.compute-1.amazonaws.com/v1/media/upload/image', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
    const imageUrl = data.url; // Assuming the server returns the URL as "url" property
    console.log(imageUrl);
    // Handle the uploaded image URL
    return imageUrl;
    } 
  } catch (error) {
    // Handle any network or fetch-related errors
    console.error('Error occurred during image upload', error);
  }
};

//{
//     "recommendations": [
//         "Look at these cuties! A Cocker Spaniel, Papillon, Golden Retriever, Beagle, Boxer, White Dog and a Poodle all playing in the field, running around, and enjoying the sunshine. Their snouts are wagging with joy as they explore the grassland together. Such a special sight of these loving animals enjoying each other's company! #dog #mammal #puppy #pet #canine #lawn #grass #goldenretriever #beagle #boxer #poodle",
//         "Look at that! Two of the cutest pups out there, a Cocker Spaniel and a Papillon, playing in the field. A Golden Retriever and a Beagle watch on, while a Boxer and a Poodle chase each other around the tall grass. Nothing like a day outdoors with these wonderful canine companions! #doglovers #AnimalLovers #MammalLovers #PetLovers #PuppyLovers #WhiteDogLovers #CockerSpanielLovers #PapillonLovers #GoldenRetrieverLovers #BeagleLovers #BoxerLovers #PoodleLovers #GrassLovers #LawnLovers #OutdoorsLovers #SnoutHoundLovers #FieldGrasslandLovers",
//         "Oh, the joy of watching dogs run and play! 🐶🐩 From a Golden Retriever to a Poodle, a Cocker Spaniel to a Beagle, a Papillon to a Boxer, all these furry friends are having a blast in the great outdoors! Chasing each other through the grass with their snouts in the air, playing tag in the field and rolling around in the grassland, these pups are living their best life! 🐕 #doglovers #pets #mammals #animal #canine #puppy"
//     ]
// }