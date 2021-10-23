using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BigScreenClient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        // GET api/<GameController>
        [HttpGet()]
        public IActionResult Get([FromQuery] int numberOfWords)
        {
            return Ok(new { words = Game.NewGame(numberOfWords) });
        }
    }
}
