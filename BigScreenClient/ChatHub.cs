using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System;

namespace BigScreenClient
{
    public class ChatHub : Hub
    {
        public async Task AddToGroup(string groupName)
        {
            try
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
                await NewUserNotification(groupName, Context.ConnectionId);         
            }
            catch(System.Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }

        public async Task SendToUser(string groupName, string connectionId, string message)
        {
            await Clients.Group(groupName).SendAsync("ReceiveMessage", connectionId, message);
            Console.WriteLine($"Message '{message}' to user '{connectionId}'");
        }

        public async Task SendToGroup(string groupName, string answer, string message)
        {
            await Clients.Groups(groupName).SendAsync("Answer", answer, message);
            Console.WriteLine($"Answer '{answer}' to group '{groupName}'");
        }

        public string GetConnectionId() => Context.ConnectionId;

        private async Task NewUserNotification(string groupName, string connectionId)
        {
            await Clients.Groups(groupName).SendAsync("NewUser", connectionId);
            Console.WriteLine($"New connect '{connectionId}' to group '{groupName}'");
        }
    }
}
