package org.auscope.portal.server.web;

import org.springframework.stereotype.Repository;

import java.io.*;
import java.net.URL;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.MalformedURLException;

/**
 * User: Mathew Wyatt
 * Date: 25/03/2009
 * Time: 11:37:40 AM
 */

@Repository
public class HttpServiceCaller {

    public BufferedInputStream callHttpUrlGet(String serviceUrl) throws IOException {

        URL url = new URL(serviceUrl);
//       HttpURLConnection conn = (HttpURLConnection)url.openConnection();
//       conn.setRequestMethod("GET");

        //conn.setAllowUserInteraction(false); // no user interact [like pop up]
        //conn.setDoOutput(true); // want to send
        //conn.setRequestProperty( "Content-type", "text/xml" );
        //conn.setRequestProperty( "Content-length", Integer.toString(postData.length()));
        //OutputStream ost = conn.getOutputStream();
        //PrintWriter pw = new PrintWriter(ost);
        //pw.print(postData); // here we "send" our body!
        //pw.flush();
        //pw.close();

        return new BufferedInputStream(url.openStream());
    }

    public BufferedInputStream callHttpUrlPost(String serviceUrl, String postData) throws IOException {

        URL url = new URL(serviceUrl);
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();

        conn.setRequestMethod("POST");
        conn.setAllowUserInteraction(false); // no user interact [like pop up]
        conn.setDoOutput(true); // want to send
        conn.setRequestProperty( "Content-type", "text/xml" );
        conn.setRequestProperty( "Content-length", Integer.toString(postData.length()));
        OutputStream ost = conn.getOutputStream();
        PrintWriter pw = new PrintWriter(ost);
        pw.print(postData); // here we "send" our body!
        pw.flush();
        pw.close();

        return new BufferedInputStream(conn.getInputStream());
    }

    public String responseToString(BufferedInputStream stream) throws IOException {
        StringBuffer stringBuffer = new StringBuffer();
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        String line;
        while((line = reader.readLine()) != null) {
            stringBuffer.append(line);
        }
        return stringBuffer.toString();
    }

    public BufferedInputStream stringToStream(String string) throws IOException {
        return new BufferedInputStream(new ByteArrayInputStream(string.getBytes()));
    }

    public static void main(String[] args) {
        
    }
}
