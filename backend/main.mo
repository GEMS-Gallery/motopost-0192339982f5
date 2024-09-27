import Bool "mo:base/Bool";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Time "mo:base/Time";

actor BlogPost {
    public type Post = {
        id: Nat;
        title: Text;
        content: Text;
        author: Text;
        createdAt: Int;
    };

    stable var posts : [Post] = [];
    stable var nextId : Nat = 0;

    public func createPost(title: Text, content: Text, author: Text) : async Nat {
        let post : Post = {
            id = nextId;
            title = title;
            content = content;
            author = author;
            createdAt = Time.now();
        };
        posts := Array.append(posts, [post]);
        nextId += 1;
        Debug.print("Post created with ID: " # debug_show(nextId - 1));
        nextId - 1
    };

    public query func getAllPosts() : async [Post] {
        Debug.print("Returning " # debug_show(posts.size()) # " posts");
        posts
    };

    public query func getPost(id: Nat) : async ?Post {
        Array.find(posts, func (post: Post) : Bool { post.id == id })
    };

    public func updatePost(id: Nat, title: Text, content: Text) : async Bool {
        posts := Array.map(posts, func (post: Post) : Post {
            if (post.id == id) {
                return {
                    id = post.id;
                    title = title;
                    content = content;
                    author = post.author;
                    createdAt = post.createdAt;
                };
            };
            post
        });
        true
    };

    public func deletePost(id: Nat) : async Bool {
        let initialLength = posts.size();
        posts := Array.filter(posts, func (post: Post) : Bool { post.id != id });
        posts.size() != initialLength
    };
}
