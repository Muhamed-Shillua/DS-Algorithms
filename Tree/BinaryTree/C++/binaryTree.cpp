#include <iostream>
#include <queue>
#include <vector>
#include <string>

using namespace std;

/// ======================= TreeNode =======================

/**
 * @class TreeNode
 * @brief Represents a node in a binary tree.
 * @tparam T Type of the data stored in the node
 */
template<typename T>
class TreeNode {
public:
    T data;            ///< Value stored in the node
    TreeNode* left;    ///< Pointer to the left child node
    TreeNode* right;   ///< Pointer to the right child node

    /**
     * @brief Constructor: Creates a new node with the given value.
     * @param value Value to store in the node
     */
    TreeNode(T value) : data(value), left(nullptr), right(nullptr) {}
};

/// ======================= BinaryTree =======================

/**
 * @class BinaryTree
 * @brief Template class representing a binary tree with level-order insertion,
 *        traversals, deletion, and ASCII visual printing.
 * @tparam T Type of data stored in the tree nodes
 */
template<typename T>
class BinaryTree {
private:
    TreeNode<T>* root; ///< Pointer to the root node of the tree

public:
    /**
     * @brief Constructs an empty binary tree.
     */
    BinaryTree() : root(nullptr) {}

    // -------------------- Insert (Level-Order) --------------------
    /**
     * @brief Inserts a new node with the specified value into the tree using level-order.
     * @param value Value to insert into the tree
     */
    void insert(T value) {
        TreeNode<T>* newNode = new TreeNode<T>(value);
        if (!root) { root = newNode; return; }

        queue<TreeNode<T>*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode<T>* current = q.front(); q.pop();
            if (!current->left) { current->left = newNode; return; } else q.push(current->left);
            if (!current->right) { current->right = newNode; return; } else q.push(current->right);
        }
    }

    // -------------------- Height --------------------
    /**
     * @brief Computes the height of a subtree starting from the given node.
     * @param node Node to start computing height from
     * @return Height of the subtree
     */
    int height(TreeNode<T>* node) {
        if (!node) return 0;
        return 1 + max(height(node->left), height(node->right));
    }

    /**
     * @brief Computes the height of the entire tree.
     * @return Height of the tree
     */
    int height() { return height(root); }

    // -------------------- Pre-Order Traversal --------------------
    void preOrder(TreeNode<T>* node, vector<T>& result) {
        if (!node) return;
        result.push_back(node->data);
        preOrder(node->left, result);
        preOrder(node->right, result);
    }

    vector<T> preOrder() {
        vector<T> result;
        preOrder(root, result);
        return result;
    }

    // -------------------- In-Order Traversal --------------------
    void inOrder(TreeNode<T>* node, vector<T>& result) {
        if (!node) return;
        inOrder(node->left, result);
        result.push_back(node->data);
        inOrder(node->right, result);
    }

    vector<T> inOrder() {
        vector<T> result;
        inOrder(root, result);
        return result;
    }

    // -------------------- Post-Order Traversal --------------------
    void postOrder(TreeNode<T>* node, vector<T>& result) {
        if (!node) return;
        postOrder(node->left, result);
        postOrder(node->right, result);
        result.push_back(node->data);
    }

    vector<T> postOrder() {
        vector<T> result;
        postOrder(root, result);
        return result;
    }

    // -------------------- Find Node --------------------
    TreeNode<T>* find(T value, TreeNode<T>* node) {
        if (!node) return nullptr;
        if (node->data == value) return node;

        TreeNode<T>* leftRes = find(value, node->left);
        if (leftRes) return leftRes;

        return find(value, node->right);
    }

    TreeNode<T>* find(T value) { return find(value, root); }

    // -------------------- Delete Node --------------------
    void deleteNode(T value) {
        TreeNode<T>* target = find(value);
        if (!target) throw runtime_error("Node does not exist.");

        TreeNode<T>* lastRight = root;
        TreeNode<T>* parent = nullptr;

        while (lastRight->right) { parent = lastRight; lastRight = lastRight->right; }

        target->data = lastRight->data;

        if (parent == nullptr) root = nullptr;
        else parent->right = nullptr;

        delete lastRight;
    }

    // -------------------- Print --------------------
    struct NodeInfo {
        string text;           ///< Node's text
        int width;             ///< Width of the subtree
        int middle;            ///< Middle position for connecting branches
        vector<string> lines;  ///< Lines representing the subtree
    };

    NodeInfo buildTree(TreeNode<T>* node) {
        if (!node) return {"", 0, 0, {}};

        string val = string(1, node->data); // direct conversion for char or string assumed to be T

        NodeInfo left = buildTree(node->left);
        NodeInfo right = buildTree(node->right);

        int width = left.width + val.length() + right.width;
        int middle = left.width + val.length() / 2;

        vector<string> lines;

        // First line: node value
        lines.push_back(string(left.width, ' ') + val + string(right.width, ' '));

        // Second line: branches
        string branch(width, ' ');
        if (!left.lines.empty()) branch[left.width - 1] = '/';
        if (!right.lines.empty()) branch[left.width + val.length()] = '\\';
        lines.push_back(branch);

        // Merge children
        int height = max(left.lines.size(), right.lines.size());
        for (int i = 0; i < height; i++) {
            string L = i < left.lines.size() ? left.lines[i] : string(left.width, ' ');
            string R = i < right.lines.size() ? right.lines[i] : string(right.width, ' ');
            lines.push_back(L + string(val.length(), ' ') + R);
        }

        return {val, width, middle, lines};
    }

    void print() {
        if (!root) return;
        NodeInfo tree = buildTree(root);
        for (auto& line : tree.lines) cout << line << endl;
    }
};
