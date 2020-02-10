import React, {useState} from 'react';
import '../../style.css';

export default function Timeline(){
    const [tweetText, setTweetText] = useState(null);

    const [tweetCollection, setTweetCollection] = useState([
        {
            message_id: 1,
            author_id: 1,
            text: 'Hej verden - jeg er Mathias',
            pub_date: 10102020,
            flagged: 0
        },
        {
            message_id: 1,
            author_id: 2,
            text: 'Hej verden - jeg er Oliver',
            pub_date: 10102020,
            flagged: 0
        },
        {
            message_id: 1,
            author_id: 2,
            text: 'Hvordan går det man?!',
            pub_date: 10102020,
            flagged: 0
        },
    ]);

    function submitTweet(e){
        e.preventDefault();

        if(tweetText.length > 0){console.log('Calling API')}
        else {console.log('Tweet is empty')}
    }

    return(
        <div>
            <form className="timeline-tweet-form" method="POST" onSubmit={(e) => submitTweet(e)}>
                <p>What is on your mind</p>
                <input className="timeline-tweet-input-field" value={tweetText} onChange={(e) => setTweetText(e.target.value)}/> <br/>
                <input type="submit" value="Send tweet"/>
            </form>

            {
                !!tweetCollection && tweetCollection.map(tweet => (
                    <div className="timeline-tweet-container">
                        <p> User: {tweet.author_id} </p>
                        <p> Tweet: {tweet.text}</p>
                        <p> Written: {tweet.pub_date} </p>
                    </div>
                ))
            }
        </div>
    );
}

