using Microsoft.AspNetCore.Mvc;
using BigScreenReact.Models;

namespace BigScreenReact.Controllers
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
