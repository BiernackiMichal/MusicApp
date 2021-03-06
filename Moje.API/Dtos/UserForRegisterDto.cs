using System.ComponentModel.DataAnnotations;

namespace Moje.API.Dtos
{
    public class UserForRegisterDto
    {   
        [Required(ErrorMessage="Nazwa użytkownika jest wymagana.")]
        [StringLength(20, MinimumLength=4, ErrorMessage="Nazwa użytkownika musi się składać od 4 do 20 znaków")]
        public string Username { get; set; }
        
        [Required(ErrorMessage ="Hasło jest wymagane.")]
        [StringLength(12, MinimumLength=6, ErrorMessage="Hasło musi się składać od 6 do 12 znaków")]
        public string Password { get; set; }
        
    }
}