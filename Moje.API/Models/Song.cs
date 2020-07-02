namespace Moje.API.Models
{
    public class Song
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Artist { get; set; }
        public string Genre {get; set;}
        public string UrlToPlay { get; set; }
        public string UrlToDownload { get; set; }
        public string WhoAdded{ get; set; }
        public string AddedDateTime { get; set; }
    }
}