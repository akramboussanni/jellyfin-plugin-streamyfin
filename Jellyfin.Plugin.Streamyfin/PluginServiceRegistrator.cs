using Jellyfin.Data.Events.Users;
using Jellyfin.Plugin.Streamyfin.PushNotifications;
using Jellyfin.Plugin.Streamyfin.PushNotifications.Events;
using MediaBrowser.Controller;
using MediaBrowser.Controller.Events;
using MediaBrowser.Controller.Events.Session;
using MediaBrowser.Controller.Library;
using MediaBrowser.Controller.Plugins;
using Microsoft.Extensions.DependencyInjection;

namespace Jellyfin.Plugin.Streamyfin;

/// <summary>
/// Provides service registration for the plugin
/// </summary>
public class PluginServiceRegistrator : IPluginServiceRegistrator
{
    /// <inheritdoc />
    public void RegisterServices(IServiceCollection serviceCollection, IServerApplicationHost applicationHost)
    {
        // helpers
        serviceCollection.AddSingleton<SerializationHelper>();
        serviceCollection.AddSingleton<NotificationHelper>();

        // Event listeners
        serviceCollection.AddScoped<IEventConsumer<SessionStartedEventArgs>, SessionStartEvent>();
        serviceCollection.AddScoped<IEventConsumer<PlaybackStartEventArgs>, PlaybackStartEvent>();
        serviceCollection.AddScoped<IEventConsumer<UserLockedOutEventArgs>, UserLockedOutEvent>();
    }
}