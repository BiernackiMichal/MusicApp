using System.Threading.Tasks;
using Moje.API.Models;

namespace Moje.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Login(string username, string password);
         Task<User> Register(User user, string password);
         Task<bool> UserExists(string username);
    }
}