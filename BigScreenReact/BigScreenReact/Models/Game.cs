using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BigScreenReact.Models
{
    public class Game
    {
        public static string[] NewGame(int maxNumberOfWords = 3)
        {
            var random = new Random();
            var list = new List<string>();
            list.Add("Klar!");

            for (var i = 0; i < maxNumberOfWords; i++)
            {
                var index = random.Next(Nouns.WordList.Count);
                list.Add(Nouns.WordList[index]);
            }


            list.Add("Færdig!");
            return list.ToArray();
        }
    }
}
