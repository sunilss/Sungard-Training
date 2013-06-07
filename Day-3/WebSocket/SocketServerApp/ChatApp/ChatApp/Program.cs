using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Fleck;
namespace ChatApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var connections = new List<IWebSocketConnection>();
            var server = new WebSocketServer("ws://localhost:9090/ChatServer");
            server.Start(con =>
                {
                    con.OnOpen += () =>
                        {
                            connections.Add(con);
                            Console.WriteLine("A new connection is established");
                        };
                    con.OnClose += () =>
                        {
                            connections.Remove(con);
                            Console.WriteLine("An existing connection is destroyed");
                        };
                    con.OnMessage += s =>
                        {
                            Console.WriteLine("A new message [{0}] is received", s);
                            foreach(var c in connections)
                                if (c != con) c.Send(s);
                        };
                });
            Console.WriteLine("Press any text to send to the client or ENTER to shutdown");
            var input = string.Empty;
            while ((input = Console.ReadLine()) != "EXIT")
            {
                foreach(var c in connections)
                    c.Send(input);
            }
            Console.ReadLine();
        }
    }
}
