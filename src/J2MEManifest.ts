export type J2MEJarFileManifest = {
    /** Must be the same format and value as the System property microedition.configuration.
     *For example: CLDC-1.0 */
    "MicroEdition-Configuration": J2MEConfiguration;

    /** Must be the same format and value as the System property microedition.profiles.
     * For example: MIDP-2.0
     */
    "MicroEdition-Profile": MicroEditionProfile;

    /** 
     * The name, icon, and class of the <n> midlet in the JAR file separated by a comma. The name and class are mandatory.
     *
     * For example 1: Demo, /icons/simpledemo.png, com.mobilefish.Demo
     * 
     * For example 2: Demo, , com.mobilefish.Demo
     * 
     * The attribute must occur in MANIFEST.MF or JAD or either, but is not optional.
     * 
     * <n> is an integer, starting at 1 and incremented by 1 for each midlet.
     * */
    "MIDlet-1": string;

    /** The minimum number of bytes of persistent data required by the MIDlet suite */
    "MIDlet-Data-Size"?: number;

    /**
     * The application management system uses this confirmation prompt when removing the MIDlet suite.
     * For example:
     * Are you sure you want to delete the Demo?
     */
    "MIDlet-Delete-Confirm"?: string;

    /**
     * This property indicates the URL for posting removal status.
     * The deletion of a MIDlet suite is of interest to the company providing the MIDlet suite. When the user deletes the MIDlet suite a deletion report is send.
     * For example: https://www.mobilefish.com/ota.php?a=d&k=36
     */
    "MIDlet-Delete-Notify"?: string;

    /** The MIDlet suite description */
    "MIDlet-Description"?: string;

    /**
     * The case-sensitive absolute name of a .png file within the JAR used to represent the MIDlet suite.
     * For example: /icons/mydemo.png
     */
    "MIDlet-Icon"?: string;

    /**
     * The URL where more information can be found describing the MIDlet suite.
     * For example:
     * https://www.mobilefish.com/midlets/demo.html
     */
    "MIDlet-Info-URL"?: string;

    /**
     * Indicates the URL for posting installation and update status.
     * The success or failure of the installation and upgrade of a MIDlet suite is of interest to the company providing the MIDlet suite. When the user installs the MIDlet suite an installation report is send.
     * For example: https://www.mobilefish.com/ota.php?a=i&k=36
     */
    "MIDlet-Install-Notify"?: string;

    /** The name of the MIDlet suite */
    "MIDlet-Name": string;

    /**
     * Zero or more permissions that are non-critical to the function of the MIDlet suite.
     *
     * If any one of the non-critical permissions defined in this field is not supported by the phone, then the phone ignores the permissions and installs the MIDlet suite.
     *
     * For example:
     * The MIDlet suite may use a HTTPS connection, but it is not vital to function.
     * javax.microedition.io.Connector.https
     *
     */
    "MIDlet-Permissions-Opt"?: string;
    
    /**
     * Zero or more permissions that are critical to the function of the MIDlet suite.
     * 
     * If any one of the critical permissions defined in this field is not supported by the phone, then the phone will not install the MIDlet suite.
     * 
     * For example:
     * The MIDlet suite requires a HTTP and HTTPS connection to function.
     * 
     * javax.microedition.io.Connector.http,
     * javax.microedition.io.Connector.https
     */
    "MIDlet-Permissions"?: string;

    /**
     * To push data from the server and launch a mobile application automatically in the device, without the device being explicitly started by the user. 
     * The push connection has the following format: <ConnectionURL>, <MIDletClassName>, <AllowedSender>
     * 
     * Where:
     * <ConnectionURL>
     * The connection string used in Connector.open().
     * 
     * <MIDletClassName>
     * The MIDlet responsible for the connection, see MIDlet-<n>
     * 
     * <AllowedSender>
     * A filter that restricts which senders are valid for launching the requested MIDlet.
     * 
     * For example 1:
     * datagram://:444, com.mobilefish.Demo, 64.233.167.99
     * 
     * For example 2:
     * socket://:444, com.mobilefish.Demo, *
     * 
     * Note:
     * <m> is an integer, starting at 1 and incremented by 1 for each Push Registry entry.
     */
    "MIDlet-Push-1"?: string;

    /** The company that provides the MIDlet suite. e.g.: CompanyName.com */
    "MIDlet-Vendor": string;

    /** The MIDlet suite version number, e.g. 1.0.1 */
    "MIDlet-Version": MidletVersionNumber;
} & { [key in MidletN]?: string; } & { [key in MidletPushN]?: string; };


type MidletVersionNumber = `${number}.${number}` | `${number}.${number}.${number}`;
type MidletN = `MIDlet-${number}`;
type MidletPushN = `MIDlet-Push-${number}`;

const J2MEConfigurations = ["CLDC-1.0", "CLDC-1.1"] as const;
type J2MEConfiguration = keyof typeof J2MEConfigurations[number];

const MicroEditionProfiles = ["MIDP-1.0", "MIDP-2.0", "MIDP-3.0"] as const;
type MicroEditionProfile = keyof typeof MicroEditionProfiles[number];

export type J2MEJadFileManifest = J2MEJarFileManifest & {
    /** The JAR file size in bytes */
    "MIDlet-Jar-Size": number;

    /**
     * The URL from which the JAR file can be loaded. Both absolute and relative URLs MUST be supported. The context for a relative URL is the URL from which this application descriptor was loaded.
     * Example: https://www.mobilefish.com/midlets/Demo.jar
     */
    "MIDlet-Jar-URL": string;
};